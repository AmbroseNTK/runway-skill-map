import { createReducer, on } from '@ngrx/store';
import * as MetaActions from '../actions/meta.action';
import { MetaState } from '../states/meta.state';

export const initialState: MetaState = {
  authenticated: false,
  globalError: '',
};

export const metaReducer = createReducer(
  initialState,
  on(MetaActions.load, (state) => ({
    ...state,
  })),
  on(MetaActions.loadSuccess, (state, action) => ({
    ...state,
    authenticated: action.meta.authenticated,
  }))
);
