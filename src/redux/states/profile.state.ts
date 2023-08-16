import { Profile } from 'src/models/profile.model';
import { Skill } from 'src/models/skill.model';

export interface ProfileState {
  current: Profile | null;
  skillCount: number;
  loading: boolean;
  error: any;
  skillList: Skill[];
  skillExisted: boolean;
}
