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
import { HomeComponent } from '../home/home.component';
import { PropertySearchComponent } from '../properties/pages/property-search/property-search.component';
import { LocationsService } from '../shared/services/locations.service';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let compiled: HTMLElement;
  let locationsService: LocationsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent },
          { path: 'properties/search', component: PropertySearchComponent },
        ]),
        HttpClientModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    locationsService = fixture.debugElement.injector.get(LocationsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the property-search page with queryParam announceType as rent', fakeAsync(
    inject([Location], (location: Location) => {
      const footerLink = compiled.querySelectorAll(
        '.footer__link'
      )[0] as HTMLAnchorElement;
      footerLink.click();
      tick();
      expect(location.path()).toEqual('/properties/search?announceType=rent');
    })
  ));

  it('should navigate to the property-search page with queryParam announceType as sale', fakeAsync(
    inject([Location], (location: Location) => {
      const footerLink = compiled.querySelectorAll(
        '.footer__link'
      )[1] as HTMLAnchorElement;
      footerLink.click();
      tick();
      expect(location.path()).toEqual('/properties/search?announceType=sale');
    })
  ));

  it('should navigate to the property-search page with queryParam hasGarage as true', fakeAsync(
    inject([Location], (location: Location) => {
      const footerLink = compiled.querySelectorAll(
        '.footer__link'
      )[2] as HTMLAnchorElement;
      footerLink.click();
      tick();
      expect(location.path()).toEqual('/properties/search?hasGarage=true');
    })
  ));

  it('should navigate to the property-search page with queryParam petAllowed as true', fakeAsync(
    inject([Location], (location: Location) => {
      const footerLink = compiled.querySelectorAll(
        '.footer__link'
      )[3] as HTMLAnchorElement;
      footerLink.click();
      tick();
      expect(location.path()).toEqual('/properties/search?petAllowed=true');
    })
  ));

  it('should display the cities received from the LocationsService', fakeAsync(
    inject([Location], (location: Location) => {
      spyOn(locationsService, 'getCities').and.returnValue(
        new Observable((subscriber) =>
          subscriber.next({
            cities: [
              'Niterói',
              'Vitória',
              'São Paulo',
              'Macapá',
              'Aracaju',
              'Salvador',
            ],
            numberOfCities: 6,
          })
        )
      );
      component.ngOnInit();
      fixture.detectChanges();

      // Selecting one of the cities
      const footerLink = compiled.querySelectorAll(
        '.footer__link'
      )[5] as HTMLAnchorElement;
      footerLink.click();
      tick();
      expect(locationsService.getCities).toHaveBeenCalled();
      expect(location.path()).toEqual('/properties/search?city=Vit%C3%B3ria');
    })
  ));

  it('should fail to receive cities from the LocationsService', fakeAsync(
    inject([Location], (location: Location) => {
      spyOn(locationsService, 'getCities').and.returnValue(
        new Observable((subscriber) => subscriber.error())
      );
      component.ngOnInit();
      fixture.detectChanges();

      // Selecting one of the cities
      const footerLink = compiled.querySelectorAll(
        '.footer__link'
      )[5] as HTMLAnchorElement;
      footerLink.click();
      tick();
      expect(locationsService.getCities).toHaveBeenCalled();
      expect(location.path()).toEqual('/properties/search?city=Sorocaba');
    })
  ));
});
