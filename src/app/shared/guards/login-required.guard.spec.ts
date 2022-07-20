import { Location } from '@angular/common';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { ScannedActionsSubject } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthComponent } from 'src/app/auth/auth.component';
import { UserFavoritesComponent } from 'src/app/user/user-favorites/user-favorites.component';
import * as fromApp from '../../store/app.reducer';

import { LoginRequiredGuard } from './login-required.guard';

describe('LoginRequiredGuard', () => {
  describe('User Logged In', () => {
    let guard: LoginRequiredGuard;
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
        favorites: [],
      },
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([
            {
              path: 'user/favorites',
              component: UserFavoritesComponent,
              canActivate: [LoginRequiredGuard],
            },
            {
              path: 'auth',
              component: AuthComponent,
            },
          ]),
        ],
        providers: [
          provideMockStore({ initialState }),
          Actions,
          ScannedActionsSubject,
        ],
      });
      guard = TestBed.inject(LoginRequiredGuard);
    });

    it('should be created', () => {
      expect(guard).toBeTruthy();
    });

    it('should let the user enter the favorites page', fakeAsync(
      inject([Location, Router], (location: Location, router: Router) => {
        router.navigate(['/user', 'favorites']);
        tick();
        expect(location.path()).toEqual('/user/favorites');
      })
    ));
  });

  describe('User Not Logged In', () => {
    let guard: LoginRequiredGuard;
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

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([
            {
              path: 'user/favorites',
              component: UserFavoritesComponent,
              canActivate: [LoginRequiredGuard],
            },
            {
              path: 'auth',
              component: AuthComponent,
            },
          ]),
        ],
        providers: [
          provideMockStore({ initialState }),
          Actions,
          ScannedActionsSubject,
        ],
      });
      guard = TestBed.inject(LoginRequiredGuard);
      spyOn(guard, 'canActivate').and.callThrough();
    });

    it('should be created', () => {
      expect(guard).toBeTruthy();
    });

    it('should redirect the user to the login page', fakeAsync(
      inject([Location, Router], (location: Location, router: Router) => {
        router.navigate(['/user', 'favorites']);
        tick();
        expect(location.path()).toEqual('/auth?next=%2Fuser%2Ffavorites');
      })
    ));
  });
});
