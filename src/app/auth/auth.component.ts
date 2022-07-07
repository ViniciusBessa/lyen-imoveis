import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  error: Error | null = null;
  isLoading: boolean = false;
  isLogin: boolean = true;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((authState) => {
      this.error = authState.error;
      this.isLoading = authState.loading;
    });
    this.initRegisterForm();
    this.initLoginForm();
  }

  initRegisterForm(): void {
    this.registerForm = new FormGroup({
      name: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
      email: new FormControl<string | null>(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  initLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl<string | null>(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit(): void {
    if (this.isLogin && this.loginForm.valid) {
      this.store.dispatch(AuthActions.loginStart(this.loginForm.value));
    } else if (!this.isLogin && this.registerForm.valid) {
      this.store.dispatch(AuthActions.registerStart(this.registerForm.value));
    }
  }

  onClearForms(): void {
    this.registerForm.reset();
    this.loginForm.reset();
  }
}
