import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { PropertySearchComponent } from '../properties/pages/property-search/property-search.component';
import { LocationsService } from '../shared/services/locations.service';
import { SharedModule } from '../shared/shared.module';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let locationsService: LocationsService;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'properties/search', component: PropertySearchComponent },
        ]),
        HttpClientModule,
        SharedModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    locationsService = fixture.debugElement.injector.get(LocationsService);
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should successfully get 3 totalCities from LocationsService', fakeAsync(() => {
    spyOn(locationsService, 'getCities').and.returnValue(
      new Observable((subscriber) =>
        subscriber.next({
          cities: ['São Paulo', 'Rio de Janeiro', 'Manaus'],
          numberOfCities: 3,
        })
      )
    );
    component.ngOnInit();
    expect(component.totalCities).toBe(3);
    expect(locationsService.getCities).toHaveBeenCalled();
  }));

  it('should fail to get any cities from LocationsService and default to 54', fakeAsync(() => {
    spyOn(locationsService, 'getCities').and.returnValue(
      new Observable((subscriber) => subscriber.error())
    );
    component.ngOnInit();
    expect(component.totalCities).toBe(54);
    expect(locationsService.getCities).toHaveBeenCalled();
  }));

  it('should display the number of cities in the third achievement', fakeAsync(() => {
    spyOn(locationsService, 'getCities').and.returnValue(
      new Observable((subscriber) =>
        subscriber.next({
          cities: ['São Paulo', 'Rio de Janeiro', 'Manaus'],
          numberOfCities: 3,
        })
      )
    );
    component.ngOnInit();
    fixture.detectChanges();
    const thirdAchievement = compiled.querySelectorAll(
      '.achievement'
    )[2] as HTMLSpanElement;
    expect(thirdAchievement.textContent).toContain(component.totalCities);
  }));
});
