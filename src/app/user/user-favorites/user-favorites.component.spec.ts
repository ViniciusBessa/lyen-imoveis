import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import * as fromApp from '../../store/app.reducer';

import { UserFavoritesComponent } from './user-favorites.component';

describe('UserFavoritesComponent', () => {
  let component: UserFavoritesComponent;
  let fixture: ComponentFixture<UserFavoritesComponent>;
  let compiled: HTMLElement;
  const initialState: fromApp.AppState = {
    auth: {
      user: null,
      error: null,
      loading: false,
    },
    user: {
      favorites: [
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
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFavoritesComponent],
      imports: [RouterTestingModule, NoopAnimationsModule, SharedModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFavoritesComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the user favorites from the store', () => {
    expect(component.favoritedProperties.length).toEqual(1);
  });

  it('should display all the favorited properties', () => {
    const propertyItems = compiled.querySelectorAll('app-property-item');
    expect(propertyItems.length).toEqual(1);
  });
});
