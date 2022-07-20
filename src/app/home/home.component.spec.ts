import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { PropertySearchComponent } from '../properties/pages/property-search/property-search.component';
import { LocationsService } from '../shared/services/locations.service';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let locationsService: LocationsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'properties/search', component: PropertySearchComponent },
        ]),
        HttpClientModule,
        SharedModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    locationsService = fixture.debugElement.injector.get(LocationsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the search page with the queryParam announceType set as sale', fakeAsync(
    inject([Location], (location: Location) => {
      const compiled = fixture.nativeElement as HTMLElement;
      const navigateButton = compiled.querySelectorAll(
        '.box__btn'
      )[0] as HTMLButtonElement;
      navigateButton.click();
      tick();
      expect(location.path()).toEqual('/properties/search?announceType=sale');
    })
  ));

  it('should navigate to the search page with the queryParam announceType set as rent', fakeAsync(
    inject([Location], (location: Location) => {
      const compiled = fixture.nativeElement as HTMLElement;
      const navigateButton = compiled.querySelectorAll(
        '.box__btn'
      )[1] as HTMLButtonElement;
      navigateButton.click();
      tick();
      expect(location.path()).toEqual('/properties/search?announceType=rent');
    })
  ));

  it('should navigate to the search page with the queryParam petAllowed set as true', fakeAsync(
    inject([Location], (location: Location) => {
      const compiled = fixture.nativeElement as HTMLElement;
      const navigateButton = compiled.querySelectorAll(
        '.box__btn'
      )[2] as HTMLButtonElement;
      navigateButton.click();
      tick();
      expect(location.path()).toEqual('/properties/search?petAllowed=true');
    })
  ));

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
    const compiled = fixture.nativeElement as HTMLElement;
    const thirdAchievement = compiled.querySelectorAll(
      '.achievement'
    )[2] as HTMLSpanElement;
    expect(thirdAchievement.textContent).toContain(component.totalCities);
  }));
});
