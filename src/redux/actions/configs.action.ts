import { createAction } from '@ngrx/store';
import { Configs } from 'src/models/configs.model';

export const fetch = createAction('[Configs] Fetch');

export const fetchSuccess = createAction(
  '[Configs] Fetch Success',
  (payload: Configs) => ({ payload })
);

export const fetchError = createAction(
  '[Configs] Fetch Error',
  (error: any) => ({ error })
);
