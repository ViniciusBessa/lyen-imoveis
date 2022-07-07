import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const registerStart = createAction(
  '[Auth] Register Start',
  props<{ name: string; email: string; password: string }>()
);

export const loginStart = createAction(
  '[Auth] Login Start',
  props<{ email: string; password: string }>()
);

export const authSuccess = createAction(
  '[Auth] Auth Success',
  props<{ user: User; redirect: boolean }>()
);

export const authFail = createAction(
  '[Auth] Auth Fail',
  props<{ error: Error }>()
);

export const autoLogin = createAction('[Auth] Auto Login');

export const logoutStart = createAction('[Auth] Logout Start');

export const logoutUser = createAction('[Auth] Logout User');

export const resetError = createAction('[Auth] Reset Error');
