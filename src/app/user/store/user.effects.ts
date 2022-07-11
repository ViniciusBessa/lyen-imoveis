import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserData } from 'src/app/auth/models/user.model';
import { Property } from 'src/app/shared/models/property.model';
import { environment } from 'src/environments/environment';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  fetchFavorites = createEffect(() =>
    this.$actions.pipe(
      ofType(UserActions.fetchFavorites),
      mergeMap(() =>
        this.http
          .get<{ favorites: Property[]; numberOfFavorites: number }>(
            `${environment.apiUrl}/users/currentUser/propertiesFavorited`
          )
          .pipe(
            map((response) =>
              UserActions.setFavorites({ properties: response.favorites })
            ),
            catchError(() => of(UserActions.setFavorites({ properties: [] })))
          )
      )
    )
  );

  addFavorite = createEffect(
    () =>
      this.$actions.pipe(
        ofType(UserActions.addFavorite),
        mergeMap(({ property }) =>
          this.http.patch<{ user: UserData }>(
            `${environment.apiUrl}/users/currentUser/${property._id}`,
            {}
          )
        )
      ),
    { dispatch: false }
  );

  removeFavorite = createEffect(
    () =>
      this.$actions.pipe(
        ofType(UserActions.removeFavorite),
        mergeMap(({ property }) =>
          this.http.delete<{ user: UserData }>(
            `${environment.apiUrl}/users/currentUser/${property._id}`,
            {}
          )
        )
      ),
    { dispatch: false }
  );

  constructor(private $actions: Actions, private http: HttpClient) {}
}
