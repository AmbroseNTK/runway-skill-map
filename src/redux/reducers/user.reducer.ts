import { createReducer, on } from '@ngrx/store';
import * as UserAction from '../actions/user.action';
import { UserState } from '../states/user.state';

export const initialState: UserState = {
  loggedUser: null,
  loggedUserLoading: false,
  loggedUserError: '',
};

export const userReducer = createReducer(
  initialState,
  on(UserAction.login, (state) => ({
    ...state,
    loggedUserLoading: true,
  })),
  on(UserAction.logout, (state) => ({
    ...state,
    loggedUser: null,
  })),
  on(UserAction.loginSuccess, (state, action) => ({
    ...state,
    loggedUser: action.user,
    loggedUserLoading: false,
  })),
  on(UserAction.loginFailure, (state, action) => ({
    ...state,
    loggedUserLoading: false,
    loggedUserError: action.error,
  }))
);
