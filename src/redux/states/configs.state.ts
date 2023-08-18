import { Configs } from 'src/models/configs.model';

export interface ConfigsState {
  current: Configs | null;
  loading: boolean;
  error: any;
}
