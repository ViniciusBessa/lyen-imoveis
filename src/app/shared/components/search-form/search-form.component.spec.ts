import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { PropertySearchComponent } from 'src/app/properties/pages/property-search/property-search.component';
import { LocationsService } from '../../services/locations.service';

import { SearchFormComponent } from './search-form.component';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let locationsService: LocationsService;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'properties/search', component: PropertySearchComponent },
        ]),
        HttpClientModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    locationsService = fixture.debugElement.injector.get(LocationsService);
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve cities from the LocationsService', fakeAsync(() => {
    spyOn(locationsService, 'getCities').and.returnValue(
      new Observable((subscriber) =>
        subscriber.next({
          cities: ['São Paulo', 'Rio de Janeiro', 'Manaus'],
          numberOfCities: 3,
        })
      )
    );
    component.ngOnInit();
    tick();
    expect(locationsService.getCities).toHaveBeenCalled();
    expect(component.cities).toEqual(['São Paulo', 'Rio de Janeiro', 'Manaus']);
    expect(component.cities.length).toBe(3);
  }));

  it('should fail to retrieve cities from the LocationsService', fakeAsync(() => {
    spyOn(locationsService, 'getCities').and.returnValue(
      new Observable((subscriber) => subscriber.error())
    );
    component.ngOnInit();
    tick();
    expect(locationsService.getCities).toHaveBeenCalled();
    expect(component.cities).toEqual([]);
    expect(component.cities.length).toBe(0);
  }));

  it('should fail to submit the form', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    const searchForm = component.searchForm;

    // Setting invalid values
    searchForm.patchValue({ numberBedrooms: -2, numberBathrooms: -3 });

    // Submitting the form
    const submitBtn = compiled.querySelector(
      '.form__submit-btn'
    ) as HTMLButtonElement;
    submitBtn.click();

    expect(searchForm.valid).toBeFalse();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should change the forSale value to false', () => {
    component.onSetForRent();
    expect(component.forSale).toBeFalse();
  });

  it('should set the forSale value to false and then true again', () => {
    component.onSetForRent();
    const forRent = !component.forSale;
    component.onSetForSale();
    expect(forRent).toBeTrue();
    expect(component.forSale).toBeTrue();
  });

  it('should successfully submit the form and go to the property-search page', fakeAsync(
    inject([Location], (location: Location) => {
      spyOn(component, 'onSubmit').and.callThrough();
      const searchForm = component.searchForm;
      searchForm.patchValue({ city: 'Aracaju', price: 200000 });
      component.onSubmit();
      tick();
      expect(searchForm.valid).toBeTrue();
      expect(component.onSubmit).toHaveBeenCalled();
      expect(location.path()).toEqual(
        '/properties/search?city=Aracaju&numericFilters=price%3C%3D200000,numberBedrooms%3E%3D1,numberBathrooms%3E%3D1&announceType=sale'
      );
    })
  ));
});
