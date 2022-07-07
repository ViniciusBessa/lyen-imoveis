import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User | null;
  error: Error | null;
  loading: boolean;
}

const initialState: State = {
  user: null,
  error: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.registerStart, AuthActions.loginStart, (state: State) => ({
    ...state,
    loading: true,
  })),

  on(AuthActions.authSuccess, (state: State, { user }) => ({
    ...state,
    user,
    loading: false,
  })),

  on(AuthActions.authFail, (state: State, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(AuthActions.autoLogin, (state: State) => ({ ...state, loading: true })),

  on(AuthActions.logoutUser, (state: State) => ({ ...state, user: null })),

  on(AuthActions.resetError, (state: State) => ({ ...state, error: null }))
);
