import { createAction } from '@ngrx/store';
import { User } from 'src/models/user.model';

export const login = createAction('[User] Login');
export const logout = createAction('[User] Logout');
export const loginSuccess = createAction(
  '[User] Login Success',
  (user: User) => ({ user })
);
export const loginFailure = createAction(
  '[User] Login Failure',
  (error: string) => ({ error })
);
