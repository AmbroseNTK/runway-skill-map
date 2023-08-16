import { createAction } from '@ngrx/store';

export const load = createAction('[Meta] Load');
export const loadSuccess = createAction('[Meta] Load Success', (meta: any) => ({
  meta,
}));
export const loadFailure = createAction(
  '[Meta] Load Failure',
  (error: string) => ({ error })
);
