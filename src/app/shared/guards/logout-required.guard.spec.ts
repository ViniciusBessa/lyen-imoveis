import { Location } from '@angular/common';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { ScannedActionsSubject } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthComponent } from 'src/app/auth/auth.component';
import { HomeComponent } from 'src/app/home/home.component';
import * as fromApp from '../../store/app.reducer';

import { LogoutRequiredGuard } from './logout-required.guard';

describe('LogoutRequiredGuard', () => {
  describe('User Logged In', () => {
    let guard: LogoutRequiredGuard;
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
              path: 'auth',
              component: AuthComponent,
              canActivate: [LogoutRequiredGuard],
            },
            {
              path: 'home',
              component: HomeComponent,
            },
          ]),
        ],
        providers: [
          provideMockStore({ initialState }),
          Actions,
          ScannedActionsSubject,
        ],
      });
      guard = TestBed.inject(LogoutRequiredGuard);
    });

    it('should be created', () => {
      expect(guard).toBeTruthy();
    });

    it('should redirect the user to the home page', fakeAsync(
      inject([Location, Router], (location: Location, router: Router) => {
        router.navigate(['auth']);
        tick();
        expect(location.path()).toEqual('/home');
      })
    ));
  });

  describe('User Not Logged In', () => {
    let guard: LogoutRequiredGuard;
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
              path: 'auth',
              component: AuthComponent,
              canActivate: [LogoutRequiredGuard],
            },
            {
              path: 'home',
              component: HomeComponent,
            },
          ]),
        ],
        providers: [
          provideMockStore({ initialState }),
          Actions,
          ScannedActionsSubject,
        ],
      });
      guard = TestBed.inject(LogoutRequiredGuard);
    });

    it('should be created', () => {
      expect(guard).toBeTruthy();
    });

    it('should let the user enter the login page', fakeAsync(
      inject([Location, Router], (location: Location, router: Router) => {
        router.navigate(['auth']);
        tick();
        expect(location.path()).toEqual('/auth');
      })
    ));
  });
});
