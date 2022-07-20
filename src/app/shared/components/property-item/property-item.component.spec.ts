import { formatCurrency, Location } from '@angular/common';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { PropertyPageComponent } from 'src/app/properties/pages/property-page/property-page.component';
import { FavoriteComponent } from '../favorite/favorite.component';

import { PropertyItemComponent } from './property-item.component';

describe('PropertyItemComponent', () => {
  let component: PropertyItemComponent;
  let fixture: ComponentFixture<PropertyItemComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertyItemComponent, FavoriteComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'properties/:propertyId', component: PropertyPageComponent },
        ]),
        NoopAnimationsModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyItemComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Property was not provided', () => {
    it('should not display anything if no property was provided', () => {
      const propertyDiv = compiled.querySelector('.property') as HTMLDivElement;
      expect(propertyDiv).toBeFalsy();
    });
  });

  describe('Property was provided', () => {
    beforeEach(() => {
      component.property = {
        _id: 'f949e01a39db902',
        title: 'Test Title',
        description: 'Test Description',
        price: 20000,
        location: { state: 'São Paulo', city: 'São Paulo' },
        announcer: {
          userId: 'g9y43gh3n809',
          name: 'TestUser',
          email: 'test@email.com',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        announceType: 'rent',
        numberBedrooms: 2,
        numberBathrooms: 3,
        petAllowed: true,
        hasGarage: false,
        images: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      fixture.detectChanges();
    });

    it("should display the property's informations without images", () => {
      const propertyDiv = compiled.querySelector('.property') as HTMLDivElement;
      const propertyImg = compiled.querySelector(
        '.property__img'
      ) as HTMLImageElement;
      expect(propertyDiv).toBeTruthy();
      expect(propertyImg).toBeTruthy();
      expect(propertyImg.src).toContain('assets/images/placeholder_house.jpg');
      expect(propertyDiv.textContent).toContain(component.property.title);
      expect(propertyDiv.textContent).toContain(component.property.description);
      expect(propertyDiv.textContent).toContain(
        `${formatCurrency(component.property.price, 'en-US', 'R$')} / mês`
      );
    });

    it("should display the property's informations with provided images", () => {
      component.property.images = ['image1', 'image2'];
      component.property.announceType = 'sale';
      fixture.detectChanges();
      const propertyDiv = compiled.querySelector('.property') as HTMLDivElement;
      const propertyImg = compiled.querySelector(
        '.property__img'
      ) as HTMLImageElement;
      expect(propertyDiv).toBeTruthy();
      expect(propertyImg).toBeTruthy();
      expect(propertyImg.src).toContain('image1');
      expect(propertyDiv.textContent).toContain(component.property.title);
      expect(propertyDiv.textContent).toContain(component.property.description);
      expect(propertyDiv.textContent).toContain(
        formatCurrency(component.property.price, 'en-US', 'R$')
      );
    });

    it("should navigate to PropertyPageComponent with the property's id", fakeAsync(
      inject([Location], (location: Location) => {
        const propertyBtn = compiled.querySelector(
          '.property__page-btn'
        ) as HTMLButtonElement;
        propertyBtn.click();
        tick();
        expect(location.path()).toEqual('/properties/f949e01a39db902');
      })
    ));
  });
});
