import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { LocationsService } from 'src/app/shared/services/locations.service';

import { PropertiesFilterComponent } from './properties-filter.component';

describe('PropertiesFilterComponent', () => {
  let component: PropertiesFilterComponent;
  let fixture: ComponentFixture<PropertiesFilterComponent>;
  let locationsService: LocationsService;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertiesFilterComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertiesFilterComponent);
    component = fixture.componentInstance;
    locationsService = fixture.debugElement.injector.get(LocationsService);
    compiled = fixture.nativeElement as HTMLElement;
    spyOn(locationsService, 'getStates').and.returnValue(
      new Observable((subscriber) =>
        subscriber.next({
          states: ['Maranhão', 'Alagoas', 'Santa Catarina', 'Espírito Santo'],
          numberOfStates: 4,
        })
      )
    );
    spyOn(locationsService, 'getCities').and.returnValue(
      new Observable((subscriber) =>
        subscriber.next({
          cities: ['São Paulo', 'Rio de Janeiro', 'Manaus'],
          numberOfCities: 3,
        })
      )
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive cities and states from the LocationsService', () => {
    expect(locationsService.getStates).toHaveBeenCalled();
    expect(locationsService.getCities).toHaveBeenCalled();
    expect(component.states).toEqual([
      'Maranhão',
      'Alagoas',
      'Santa Catarina',
      'Espírito Santo',
    ]);
    expect(component.cities).toEqual(['São Paulo', 'Rio de Janeiro', 'Manaus']);
  });

  it('should toggle the filters form display', () => {
    spyOn(component, 'onToggleFilters').and.callThrough();

    // Clicking the toggle button
    const toggleBtn = compiled.querySelector(
      '.form__toggle'
    ) as HTMLButtonElement;
    toggleBtn.click();
    fixture.detectChanges();

    // Getting the form from the template
    const form = compiled.querySelector('.form') as HTMLFormElement;

    expect(component.onToggleFilters).toHaveBeenCalled();
    expect(form).toBeTruthy();
    expect(component.showFilters).toBeTrue();
  });

  it('should always keep the maxPrice higher than or equal to minPrice', () => {
    const filtersForm = component.filtersForm;
    filtersForm.patchValue({ minPrice: 100000, maxPrice: 2000 });
    expect(filtersForm.get('minPrice')?.value).toBe(100000);
    expect(filtersForm.get('maxPrice')?.value).toBe(100000);
    expect(filtersForm.get('maxPrice')?.value).toBeGreaterThanOrEqual(
      filtersForm.get('minPrice')?.value
    );
  });

  it('should fail to submit the form', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    component.onToggleFilters();
    fixture.detectChanges();

    // Updating the form
    const filtersForm = component.filtersForm;
    filtersForm.patchValue({ numberBedrooms: -3, numberBathrooms: -2 });

    // Submitting the form
    const submitBtn = compiled.querySelector(
      '.form__submit-btn'
    ) as HTMLButtonElement;
    submitBtn.click();

    expect(component.onSubmit).toHaveBeenCalled();
    expect(filtersForm.get('numberBedrooms')?.valid).toBeFalse();
    expect(filtersForm.get('numberBathrooms')?.valid).toBeFalse();
    expect(filtersForm.valid).toBeFalse();
  });

  it('should successfully submit the form', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    component.onToggleFilters();
    fixture.detectChanges();

    // Updating the form
    const filtersForm = component.filtersForm;
    filtersForm.patchValue({
      numberBedrooms: 2,
      numberBathrooms: 3,
      petAllowed: true,
    });

    // Submitting the form
    const submitBtn = compiled.querySelector(
      '.form__submit-btn'
    ) as HTMLButtonElement;
    submitBtn.click();

    expect(component.onSubmit).toHaveBeenCalled();
    expect(filtersForm.get('numberBedrooms')?.valid).toBeTrue();
    expect(filtersForm.get('numberBathrooms')?.valid).toBeTrue();
    expect(filtersForm.get('petAllowed')?.valid).toBeTrue();
    expect(filtersForm.valid).toBeTrue();
  });
});
