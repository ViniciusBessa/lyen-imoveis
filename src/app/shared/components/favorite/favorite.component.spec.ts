import { Location } from '@angular/common';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthComponent } from 'src/app/auth/auth.component';
import * as fromApp from '../../../store/app.reducer';

import { FavoriteComponent } from './favorite.component';

describe('FavoriteComponent', () => {
  describe('User Logged In', () => {
    let component: FavoriteComponent;
    let fixture: ComponentFixture<FavoriteComponent>;
    let store: Store<fromApp.AppState>;
    const initialState: fromApp.AppState = {
      auth: {
        user: {
          userId: 'g9y43gh3n809',
          name: 'TestUser',
          email: 'test@email.com',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
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
        declarations: [FavoriteComponent],
        imports: [RouterTestingModule],
        providers: [provideMockStore({ initialState })],
      }).compileComponents();

      fixture = TestBed.createComponent(FavoriteComponent);
      component = fixture.componentInstance;
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
      store = fixture.debugElement.injector.get(Store);
      spyOn(store, 'dispatch');
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should detect that the user is logged in and the property is favorited', () => {
      expect(component.isLoggedIn).toBeTrue();
      expect(component.isFavorited).toBeTrue();
    });

    it('should fail to dispatch an action to add the property to the favorites', fakeAsync(
      inject([Location], (location: Location) => {
        component.onAddToFavorites();
        tick();
        expect(store.dispatch).not.toHaveBeenCalled();
      })
    ));

    it('should dispatch an action to remove the property from the favorites', fakeAsync(
      inject([Location], (location: Location) => {
        component.onRemoveFromFavorites();
        tick();
        expect(store.dispatch).toHaveBeenCalled();
      })
    ));
  });

  describe('User Not Logged In', () => {
    let component: FavoriteComponent;
    let fixture: ComponentFixture<FavoriteComponent>;
    const initialState: fromApp.AppState = {
      auth: {
        user: null,
        error: null,
        loading: false,
      },
      user: {
        favorites: [],
      },
    };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [FavoriteComponent],
        imports: [
          RouterTestingModule.withRoutes([
            { path: 'auth', component: AuthComponent },
          ]),
        ],
        providers: [provideMockStore({ initialState })],
      }).compileComponents();

      fixture = TestBed.createComponent(FavoriteComponent);
      component = fixture.componentInstance;
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

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should detect that the user is not logged in and the property is not favorited', () => {
      expect(component.isLoggedIn).toBeFalse();
      expect(component.isFavorited).toBeFalse();
    });

    it('should redirect the user to the login page when they try to add to their favorites', fakeAsync(
      inject([Location], (location: Location) => {
        component.onAddToFavorites();
        tick();
        expect(location.path()).toEqual('/auth?next=%2F');
      })
    ));

    it('should redirect the user to the login page when they try to remove from the favorites', fakeAsync(
      inject([Location], (location: Location) => {
        component.onRemoveFromFavorites();
        tick();
        expect(location.path()).toEqual('/auth?next=%2F');
      })
    ));
  });
});
