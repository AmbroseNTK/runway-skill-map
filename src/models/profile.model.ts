import { Skill } from './skill.model';

export interface Profile {
  id: string;
  skills: Skill[];
}
