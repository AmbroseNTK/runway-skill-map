import { Component } from '@angular/core';
import { ZoomService } from './services/zoom.service';
import { Store } from '@ngrx/store';
import { MetaState } from 'src/redux/states/meta.state';
import { loginSuccess } from 'src/redux/actions/user.action';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { UserState } from 'src/redux/states/user.state';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'skillmap';

  constructor(
    private zoomService: ZoomService,
    private auth: Auth,
    private store: Store<{ user: UserState }>
  ) {
    // check if user is logged in
    onAuthStateChanged(this.auth, (user) => {
      if (!user) {
        return;
      }
      this.store.dispatch(
        loginSuccess(<User>{
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
        })
      );
    });
  }

  sidebarOpen = true;

  zoom(event: number) {
    console.log('zoomChange', event);
    this.zoomService.setZoom(event);
  }
}
