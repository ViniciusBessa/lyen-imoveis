import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
import { Observable } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { PropertiesFilterComponent } from '../../components/properties-filter/properties-filter.component';
import { PropertiesService } from '../../properties.service';

import { PropertySearchComponent } from './property-search.component';

describe('PropertySearchComponent', () => {
  let component: PropertySearchComponent;
  let fixture: ComponentFixture<PropertySearchComponent>;
  let propertiesService: PropertiesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertySearchComponent, PropertiesFilterComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'properties/search', component: PropertySearchComponent },
        ]),
        HttpClientModule,
        SharedModule,
        NoopAnimationsModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertySearchComponent);
    component = fixture.componentInstance;
    propertiesService = fixture.debugElement.injector.get(PropertiesService);
    spyOn(propertiesService, 'getProperties').and.returnValue(
      new Observable((subscriber) =>
        subscriber.next({
          properties: [
            {
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
            },
            {
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
            },
            {
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
            },
          ],
          numberOfProperties: 100,
        })
      )
    );
    spyOn(propertiesService, 'getPropertiesCount').and.returnValue(
      new Observable((subscriber) =>
        subscriber.next({ numberOfProperties: 100 })
      )
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the queryParams by updating the filters', fakeAsync(
    inject([Location], (location: Location) => {
      spyOn(component, 'onFiltersUpdate').and.callThrough();
      component.onFiltersUpdate({
        numericFilters: 'price<=10000',
        petAllowed: false,
      });
      tick();
      expect(component.onFiltersUpdate).toHaveBeenCalled();
      expect(component.currentPage).toBe(1);
      expect(component.totalPages).toBe(17);
      expect(location.path()).toEqual(
        '/properties/search?numericFilters=price%3C%3D10000&petAllowed=false'
      );
    })
  ));

  it('should navigate to the second page', fakeAsync(
    inject([Location], (location: Location) => {
      const compiled = fixture.nativeElement as HTMLElement;
      const paginationLink = compiled.querySelectorAll(
        '.pagination__link'
      )[1] as HTMLAnchorElement;
      paginationLink.click();
      tick();
      expect(component.currentPage).toBe(2);
      expect(component.totalPages).toBe(17);
      expect(location.path()).toEqual('/properties/search?page=2');
    })
  ));

  it('should change the properties sort', fakeAsync(
    inject([Location], (location: Location) => {
      const compiled = fixture.nativeElement as HTMLElement;
      const dropdownItem = compiled.querySelectorAll(
        '.dropdown__item'
      )[1] as HTMLParagraphElement;
      dropdownItem.click();
      tick();
      expect(component.currentPage).toBe(1);
      expect(component.totalPages).toBe(17);
      expect(component.sortingText).toEqual('Maior preço');
      expect(location.path()).toEqual('/properties/search?sort=-price');
    })
  ));
});
