import * as ProfileActions from '../actions/profile.action';
import { ProfileState } from '../states/profile.state';
import { createReducer, on } from '@ngrx/store';

export const initialState: ProfileState = {
  current: null,
  loading: false,
  error: '',
  skillCount: 0,
  skillList: [],
  skillExisted: true,
};

export const profileReducer = createReducer(
  initialState,
  on(ProfileActions.get, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProfileActions.getSuccess, (state, action) => ({
    ...state,
    current: action.profile,
    loading: false,
    error: '',
  })),
  on(ProfileActions.getFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(ProfileActions.checkSkill, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProfileActions.checkSkillSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(ProfileActions.checkSkillFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(ProfileActions.uncheckSkill, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProfileActions.uncheckSkillSuccess, (state, action) => ({
    ...state,
    loading: false,
  })),
  on(ProfileActions.uncheckSkillFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(ProfileActions.countSkills, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProfileActions.countSkillsSuccess, (state, action) => ({
    ...state,
    skillCount: action.countSkills,
    loading: false,
    error: '',
  })),
  on(ProfileActions.countSkillsFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(ProfileActions.listSkills, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProfileActions.listSkillsSuccess, (state, action) => ({
    ...state,
    skillList: action.skills,
    loading: false,
    error: '',
  })),
  on(ProfileActions.isSkillExisted, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(ProfileActions.isSkillExistedSuccess, (state, action) => ({
    ...state,
    skillExisted: action.skillExisted,
    loading: false,
    error: '',
  })),
  on(ProfileActions.isSkillExistedFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  }))
);
