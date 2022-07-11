import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, Observable, mergeMap, of, take } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions';

@Injectable({ providedIn: 'root' })
export class LoginRequiredGuard implements CanActivate {
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private $actions: Actions
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      mergeMap((authState) => {
        if (authState.loading) {
          return this.$actions.pipe(
            ofType(AuthActions.authSuccess, AuthActions.authFail),
            mergeMap(() => this.store.select('auth')),
            map((authState) => {
              if (authState.user) {
                return true;
              }
              return this.router.createUrlTree(['/home']);
            })
          );
        } else if (authState.user) {
          return of(true);
        }
        return of(this.router.createUrlTree(['/home']));
      })
    );
  }
}
