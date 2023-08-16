import { createAction } from '@ngrx/store';
import { ProfileState } from '../states/profile.state';
import { Skill } from 'src/models/skill.model';
import { Profile } from 'src/models/profile.model';

export const get = createAction('[Profile] Get', (id: string) => ({ id }));
export const getSuccess = createAction(
  '[Profile] Get Success',
  (profile: Profile) => ({ profile })
);
export const getFailure = createAction(
  '[Profile] Get Failure',
  (error: any) => ({
    error,
  })
);

export const countSkills = createAction(
  '[Profile] Count Skills',
  (id: string) => ({ id })
);
export const countSkillsSuccess = createAction(
  '[Profile] Count Skills Success',
  (countSkills: number) => ({ countSkills })
);
export const countSkillsFailure = createAction(
  '[Profile] Count Skills Failure',
  (error: any) => ({
    error,
  })
);

export const checkSkill = createAction(
  '[Profile] Check Skill',
  (id: string, skill: Skill) => ({ id, skill })
);

export const checkSkillSuccess = createAction('[Profile] Check Skill Success');

export const checkSkillFailure = createAction(
  '[Profile] Check Skill Failure',
  (error: any) => ({ error })
);

export const uncheckSkill = createAction(
  '[Profile] Uncheck Skill',
  (id: string, skillId: string) => ({ id, skillId })
);

export const uncheckSkillSuccess = createAction(
  '[Profile] Uncheck Skill Success'
);

export const uncheckSkillFailure = createAction(
  '[Profile] Uncheck Skill Failure',
  (error: any) => ({ error })
);

export const listSkills = createAction(
  '[Profile] List Skills',
  (id: string, lastDocId: string) => ({ id, lastDocId })
);

export const listSkillsSuccess = createAction(
  '[Profile] List Skills Success',
  (skills: Skill[]) => ({ skills })
);

export const listSkillsFailure = createAction(
  '[Profile] List Skills Failure',
  (error: any) => ({ error })
);

export const isSkillExisted = createAction(
  '[Profile] Is Skill Existed',
  (id: string, skillId: string) => ({ id, skillId })
);

export const isSkillExistedSuccess = createAction(
  '[Profile] Is Skill Existed Success',
  (skillExisted: boolean) => ({ skillExisted })
);

export const isSkillExistedFailure = createAction(
  '[Profile] Is Skill Existed Failure',
  (error: any) => ({ error })
);
