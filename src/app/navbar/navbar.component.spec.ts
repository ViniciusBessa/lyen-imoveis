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
import { AuthComponent } from '../auth/auth.component';
import { HomeComponent } from '../home/home.component';
import { PropertySearchComponent } from '../properties/pages/property-search/property-search.component';
import * as fromApp from '../store/app.reducer';
import { UserFavoritesComponent } from '../user/user-favorites/user-favorites.component';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  describe('User Logged In', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let store: Store<fromApp.AppState>;
    let compiled: HTMLElement;
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
        loading: false,
        error: null,
      },
      user: {
        favorites: [],
      },
    };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [NavbarComponent],
        imports: [
          RouterTestingModule.withRoutes([
            { path: 'home', component: HomeComponent },
            { path: 'properties/search', component: PropertySearchComponent },
            { path: 'user/favorites', component: UserFavoritesComponent },
          ]),
        ],
        providers: [provideMockStore({ initialState })],
      }).compileComponents();

      fixture = TestBed.createComponent(NavbarComponent);
      component = fixture.componentInstance;
      store = fixture.debugElement.injector.get(Store);
      compiled = fixture.nativeElement as HTMLElement;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should navigate to the home page', fakeAsync(
      inject([Location], (location: Location) => {
        const navbarLink = compiled.querySelectorAll(
          '.navbar__link'
        )[0] as HTMLAnchorElement;
        navbarLink.click();
        tick();
        expect(location.path()).toEqual('/home');
      })
    ));

    it('should navigate to the property search page', fakeAsync(
      inject([Location], (location: Location) => {
        const navbarLink = compiled.querySelectorAll(
          '.navbar__link'
        )[1] as HTMLAnchorElement;
        navbarLink.click();
        tick();
        expect(location.path()).toEqual('/properties/search');
      })
    ));

    it('should navigate to the user favorites page', fakeAsync(
      inject([Location], (location: Location) => {
        const navbarLink = compiled.querySelectorAll(
          '.navbar__link'
        )[2] as HTMLAnchorElement;
        navbarLink.click();
        tick();
        expect(location.path()).toEqual('/user/favorites');
      })
    ));

    it('should log out the user', fakeAsync(() => {
      spyOn(store, 'dispatch');
      spyOn(component, 'onLogout').and.callThrough();
      const navbarLink = compiled.querySelectorAll(
        '.navbar__link'
      )[3] as HTMLAnchorElement;
      navbarLink.click();
      tick();
      expect(store.dispatch).toHaveBeenCalled();
      expect(component.onLogout).toHaveBeenCalled();
    }));
  });

  describe('User Not Logged In', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let compiled: HTMLElement;
    const initialState: fromApp.AppState = {
      auth: {
        user: null,
        loading: false,
        error: null,
      },
      user: {
        favorites: [],
      },
    };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [NavbarComponent],
        imports: [
          RouterTestingModule.withRoutes([
            { path: 'home', component: HomeComponent },
            { path: 'properties/search', component: PropertySearchComponent },
            { path: 'auth', component: AuthComponent },
          ]),
        ],
        providers: [provideMockStore({ initialState })],
      }).compileComponents();

      fixture = TestBed.createComponent(NavbarComponent);
      component = fixture.componentInstance;
      compiled = fixture.nativeElement as HTMLElement;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should navigate to the home page', fakeAsync(
      inject([Location], (location: Location) => {
        const navbarLink = compiled.querySelectorAll(
          '.navbar__link'
        )[0] as HTMLAnchorElement;
        navbarLink.click();
        tick();
        expect(location.path()).toEqual('/home');
      })
    ));

    it('should navigate to the property search page', fakeAsync(
      inject([Location], (location: Location) => {
        const navbarLink = compiled.querySelectorAll(
          '.navbar__link'
        )[1] as HTMLAnchorElement;
        navbarLink.click();
        tick();
        expect(location.path()).toEqual('/properties/search');
      })
    ));

    it('should navigate to the login page', fakeAsync(
      inject([Location], (location: Location) => {
        const navbarFlex = compiled.querySelector(
          '.navbar__flex'
        ) as HTMLDivElement;
        navbarFlex.click();
        tick();
        expect(location.path()).toEqual('/auth');
      })
    ));
  });
});
