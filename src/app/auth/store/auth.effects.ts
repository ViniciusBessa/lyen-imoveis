import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, catchError, map, mergeMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthError } from '../models/auth-error.model';
import { User } from '../models/user.model';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  authRegister = createEffect(() =>
    this.$actions.pipe(
      ofType(AuthActions.registerStart),
      mergeMap((authData) => {
        const { name, email, password } = authData;
        return this.http
          .post<{ user: User }>(`${environment.apiUrl}/auth/register`, {
            name,
            email,
            password,
          })
          .pipe(
            map((responseData) => AuthActions.authSuccess(responseData)),
            catchError((error: AuthError) =>
              of(AuthActions.authFail({ error: new Error(error.err) }))
            )
          );
      })
    )
  );

  authLogin = createEffect(() =>
    this.$actions.pipe(
      ofType(AuthActions.loginStart),
      mergeMap((authData) => {
        const { email, password } = authData;
        return this.http
          .post<{ user: User }>(`${environment.apiUrl}/auth/login`, {
            email,
            password,
          })
          .pipe(
            map((responseData) => AuthActions.authSuccess(responseData)),
            catchError((error: AuthError) =>
              of(AuthActions.authFail({ error: new Error(error.err) }))
            )
          );
      })
    )
  );

  authSuccess = createEffect(
    () =>
      this.$actions.pipe(
        ofType(AuthActions.authSuccess),
        tap(() => this.router.navigate(['/home']))
      ),
    { dispatch: false }
  );

  authLogout = createEffect(() =>
    this.$actions.pipe(
      ofType(AuthActions.logoutStart),
      mergeMap(() =>
        this.http.get(`${environment.apiUrl}/auth/logout`).pipe(
          map(() => AuthActions.logoutUser()),
          catchError((error: AuthError) =>
            of(AuthActions.authFail({ error: new Error(error.err) }))
          )
        )
      )
    )
  );

  authAutoLogin = createEffect(() =>
    this.$actions.pipe(
      ofType(AuthActions.autoLogin),
      mergeMap(() =>
        this.http
          .get<{ user: User }>(`${environment.apiUrl}/users/currentUser`)
          .pipe(map((responseData) => AuthActions.authSuccess(responseData)))
      )
    )
  );

  constructor(
    private $actions: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
