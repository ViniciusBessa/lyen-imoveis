import { createAction, props } from '@ngrx/store';
import { Property } from 'src/app/shared/models/property.model';

export const fetchFavorites = createAction('[User] Fetch Favorites');

export const setFavorites = createAction(
  '[User] Set Favorites',
  props<{ properties: Property[] }>()
);

export const addFavorite = createAction(
  '[User] Add Favorite',
  props<{ property: Property }>()
);

export const removeFavorite = createAction(
  '[User] Remove Favorite',
  props<{ property: Property }>()
);
