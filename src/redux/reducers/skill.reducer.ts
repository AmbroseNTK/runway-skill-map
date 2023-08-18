import { createReducer, on } from '@ngrx/store';
import * as SkillActions from '../actions/skill.action';
import { SkillState } from '../states/skill.state';

export const initialState: SkillState = {
  selectedSkill: null,
  selectedSkillLoading: false,
  selectedSkillError: '',
  countedSkills: 0,
  creating: false,
  createError: '',
};

export const skillReducer = createReducer(
  initialState,
  on(SkillActions.get, (state) => ({
    ...state,
    selectedSkillLoading: true,
  })),
  on(SkillActions.getSuccess, (state, action) => ({
    ...state,
    selectedSkill: action.skill,
    selectedSkillLoading: false,
  })),
  on(SkillActions.getFailure, (state, action) => ({
    ...state,
    selectedSkillLoading: false,
    selectedSkillError: action.error,
  })),
  on(SkillActions.count, (state) => ({
    ...state,
  })),
  on(SkillActions.countSuccess, (state, action) => ({
    ...state,
    countedSkills: action.count,
  })),
  on(SkillActions.countFailure, (state, action) => ({
    ...state,
    selectedSkillError: action.error,
    countedSkills: 0,
  })),
  on(SkillActions.create, (state) => ({
    ...state,
    creating: true,
    createError: '',
  })),
  on(SkillActions.createSuccess, (state) => ({
    ...state,
    creating: false,
    createError: '',
  })),
  on(SkillActions.createFailure, (state, action) => ({
    ...state,
    selectedSkillError: action.error,
    creating: false,
    createError: action.error,
  }))
);
