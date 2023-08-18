import { createReducer, on } from '@ngrx/store';
import * as ConfigsActions from '../actions/configs.action';
import { ConfigsState } from '../states/configs.state';

const initialState: ConfigsState = {
  current: null,
  loading: false,
  error: null,
};

export const configReducer = createReducer(
  initialState,
  on(ConfigsActions.fetch, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ConfigsActions.fetchSuccess, (state, { payload }) => ({
    ...state,
    current: payload,
    loading: false,
    error: null,
  })),
  on(ConfigsActions.fetchError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
