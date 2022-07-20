import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { HomeComponent } from '../home/home.component';
import * as fromApp from '../store/app.reducer';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let store: Store<fromApp.AppState>;
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
      declarations: [AuthComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent },
        ]),
        ReactiveFormsModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    store = fixture.debugElement.injector.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should only display one form at a time', () => {
    const forms = compiled.querySelectorAll('form');
    expect(forms.length).toEqual(1);
  });

  it('should fail to submit the login form', fakeAsync(() => {
    spyOn(component, 'onSubmit');

    // Clicking the submit button
    const submitBtn = compiled.querySelector(
      '.form__submit-btn'
    ) as HTMLButtonElement;
    submitBtn.click();
    tick();
    expect(component.loginForm.valid).toBeFalse();
    expect(component.onSubmit).toHaveBeenCalled();
  }));

  it('should reset the forms', fakeAsync(() => {
    spyOn(component, 'onClearForms').and.callThrough();

    // Filling the forms
    component.registerForm.patchValue({
      name: 'testUsername',
      email: 'test@gmail.com',
      password: 'testPassword',
    });
    component.loginForm.patchValue({
      email: 'test@gmail.com',
      password: 'testPassword',
    });

    // Clicking the clear button
    const clearBtn = compiled.querySelector(
      '.form__clear-btn'
    ) as HTMLButtonElement;
    clearBtn.click();
    tick();
    expect(component.registerForm.valid).toBeFalse();
    expect(component.loginForm.valid).toBeFalse();
  }));

  it('should submit the registerForm', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    spyOn(store, 'dispatch');

    // Filling the registerForm
    component.registerForm.patchValue({
      name: 'testUsername',
      email: 'test@gmail.com',
      password: 'testPassword',
    });
    component.isLogin = false;

    // Submitting the registerForm
    component.onSubmit();

    expect(component.registerForm.valid).toBeTrue();
    expect(component.onSubmit).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should submit the loginForm', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    spyOn(store, 'dispatch');

    // Filling the loginForm
    component.loginForm.patchValue({
      email: 'test@gmail.com',
      password: 'testPassword',
    });
    component.isLogin = true;

    // Submitting the loginForm
    component.onSubmit();

    expect(component.loginForm.valid).toBeTrue();
    expect(component.onSubmit).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalled();
  });
});
