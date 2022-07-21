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
import { PropertySearchComponent } from '../properties/pages/property-search/property-search.component';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let compiled: HTMLElement;

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
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the search page with the queryParam announceType set as sale', fakeAsync(
    inject([Location], (location: Location) => {
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
      const navigateButton = compiled.querySelectorAll(
        '.box__btn'
      )[2] as HTMLButtonElement;
      navigateButton.click();
      tick();
      expect(location.path()).toEqual('/properties/search?petAllowed=true');
    })
  ));
});
