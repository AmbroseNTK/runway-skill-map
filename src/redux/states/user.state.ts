import { User } from 'src/models/user.model';

export interface UserState {
  loggedUser: User | null;
  loggedUserLoading: boolean;
  loggedUserError: string;
}
