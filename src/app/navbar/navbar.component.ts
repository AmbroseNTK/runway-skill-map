import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from 'src/redux/states/user.state';
import * as UserActions from 'src/redux/actions/user.action';
import { DrawerService } from '../side-drawer/drawer.service';
import * as ProfileActions from 'src/redux/actions/profile.action';
import { ProfileState } from 'src/redux/states/profile.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  user$ = this.store.select((state) => state.user.loggedUser);
  loginError$ = this.store.select((state) => state.user.loggedUserError);

  constructor(
    private store: Store<{ user: UserState; profile: ProfileState }>,
    private drawer: DrawerService
  ) {
    this.user$.subscribe((user) => {
      if (user) {
        this.drawer.openStateChange.next(true);
        this.drawer.enableProfile(true);
        this.store.dispatch(ProfileActions.countSkills(user.id));
        this.store.dispatch(ProfileActions.listSkills(user.id, ''));
      }
    });
  }

  login() {
    this.store.dispatch(UserActions.login());
  }

  openPanel() {
    this.drawer.openStateChange.next(true);
  }
}
