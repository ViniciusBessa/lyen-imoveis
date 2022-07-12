import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TypedAction } from '@ngrx/store/src/models';
import { of, catchError, map, mergeMap, tap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserData } from '../models/user.model';
import * as AuthActions from './auth.actions';

const handleError = (
  errorResponse: HttpErrorResponse
): Observable<
  {
    error: Error | null;
  } & TypedAction<'[Auth] Auth Fail'>
> => {
  const error = errorResponse.error.err;

  if (typeof error === 'string') {
    return of(AuthActions.authFail({ error: new Error(error) }));
  } else if (Array.isArray(error)) {
    return of(AuthActions.authFail({ error: new Error(error[0]) }));
  }
  return of(AuthActions.authFail({ error: new Error(error.error) }));
};

@Injectable()
export class AuthEffects {
  authRegister = createEffect(() =>
    this.$actions.pipe(
      ofType(AuthActions.registerStart),
      mergeMap((authData) => {
        const { name, email, password } = authData;
        return this.http
          .post<{ user: UserData }>(`${environment.apiUrl}/auth/register`, {
            name,
            email,
            password,
          })
          .pipe(
            map((responseData) =>
              AuthActions.authSuccess({
                ...responseData,
                next: authData.next,
                redirect: true,
              })
            ),
            catchError(handleError.bind(this))
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
          .post<{ user: UserData }>(`${environment.apiUrl}/auth/login`, {
            email,
            password,
          })
          .pipe(
            map((responseData) =>
              AuthActions.authSuccess({
                ...responseData,
                next: authData.next,
                redirect: true,
              })
            ),
            catchError(handleError.bind(this))
          );
      })
    )
  );

  authSuccess = createEffect(
    () =>
      this.$actions.pipe(
        ofType(AuthActions.authSuccess),
        tap((authData) => {
          if (authData.redirect && authData.next) {
            this.router.navigateByUrl(authData.next);
          } else if (authData.redirect) {
            this.router.navigate(['/home']);
          }
        })
      ),
    { dispatch: false }
  );

  authLogoutStart = createEffect(() =>
    this.$actions.pipe(
      ofType(AuthActions.logoutStart),
      mergeMap(() =>
        this.http.get(`${environment.apiUrl}/auth/logout`).pipe(
          map(() => AuthActions.logoutUser()),
          catchError(handleError.bind(this))
        )
      )
    )
  );

  authLogout = createEffect(
    () =>
      this.$actions.pipe(
        ofType(AuthActions.logoutUser),
        tap(() => this.router.navigate(['/home']))
      ),
    { dispatch: false }
  );

  authAutoLogin = createEffect(() =>
    this.$actions.pipe(
      ofType(AuthActions.autoLogin),
      mergeMap(() =>
        this.http
          .get<{ user: UserData }>(`${environment.apiUrl}/users/currentUser`)
          .pipe(
            map((responseData) =>
              AuthActions.authSuccess({
                ...responseData,
                next: null,
                redirect: false,
              })
            ),
            catchError(() => of(AuthActions.authFail({ error: null })))
          )
      )
    )
  );

  constructor(
    private $actions: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
