import { createReducer, on } from '@ngrx/store';
import { Property } from 'src/app/shared/models/property.model';
import * as UserActions from './user.actions';

export interface State {
  favorites: Property[];
}

const initialState: State = {
  favorites: [],
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.setFavorites, (state: State, { properties }) => ({
    ...state,
    favorites: [...properties],
  })),

  on(UserActions.addFavorite, (state: State, { property }) => {
    // Checking if the property is already in the user's favorites
    const alreadyFavorited: boolean = state.favorites.some(
      (favoritedProperty) => favoritedProperty._id === property._id
    );
    if (alreadyFavorited) {
      return { ...state };
    }
    return { ...state, favorites: [...state.favorites, property] };
  }),

  on(UserActions.removeFavorite, (state: State, { property }) => {
    const newFavorites: Property[] = state.favorites.filter(
      (favoritedProperty) => favoritedProperty._id !== property._id
    );
    return { ...state, favorites: newFavorites };
  })
);
