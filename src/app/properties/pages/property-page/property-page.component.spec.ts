import { CurrencyPipe, formatCurrency } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { PropertiesService } from '../../properties.service';

import { PropertyPageComponent } from './property-page.component';

describe('PropertyPageComponent', () => {
  let component: PropertyPageComponent;
  let fixture: ComponentFixture<PropertyPageComponent>;
  let propertiesService: PropertiesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertyPageComponent],
      imports: [RouterTestingModule, HttpClientModule, SharedModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyPageComponent);
    component = fixture.componentInstance;
    propertiesService = fixture.debugElement.injector.get(PropertiesService);
    spyOn(propertiesService, 'getProperty').and.returnValue(
      new Observable((subscriber) =>
        subscriber.next({
          property: {
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
        })
      )
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the property informations', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const property = component.property;
    expect(compiled.textContent).toContain(property.title);
    expect(compiled.textContent).toContain(property.location.state);
    expect(compiled.textContent).toContain(property.location.city);
    expect(compiled.textContent).toContain(
      `${formatCurrency(property.price, 'en-US', 'R$')} / mês`
    );
    expect(compiled.textContent).toContain(property.description);
    expect(compiled.textContent).toContain(
      `${property.numberBedrooms} quartos`
    );
    expect(compiled.textContent).toContain(
      `${property.numberBathrooms} banheiros`
    );
    expect(compiled.textContent).toContain('Permite pets');
    expect(compiled.textContent).not.toContain('Possui garagem');
  });
});
