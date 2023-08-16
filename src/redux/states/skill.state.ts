import { Skill } from 'src/models/skill.model';

export interface SkillState {
  selectedSkill: Skill | null;
  selectedSkillLoading: boolean;
  selectedSkillError: any;
  countedSkills: number;
}
