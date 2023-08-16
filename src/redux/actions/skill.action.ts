import { createAction } from '@ngrx/store';
import { Skill } from 'src/models/skill.model';

export const get = createAction('[Skill] Get', (id: string) => ({ id }));
export const getSuccess = createAction(
  '[Skill] Get Success',
  (skill: Skill) => ({ skill })
);
export const getFailure = createAction('[Skill] Get Failure', (error: any) => ({
  error,
}));

export const count = createAction('[Skill] Count');
export const countSuccess = createAction(
  '[Skill] Count Success',
  (count: number) => ({ count })
);
export const countFailure = createAction(
  '[Skill] Count Failure',
  (error: any) => ({
    error,
  })
);
