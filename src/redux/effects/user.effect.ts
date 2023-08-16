import * as UserActions from '../actions/user.action';
import * as MetaActions from '../actions/meta.action';
import { UserState } from '../states/user.state';
import { User } from '../../models/user.model';

import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { catchError, map, mergeMap, of } from 'rxjs';

import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private auth: Auth) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      mergeMap((action) => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(this.auth, provider);
      }),
      map((userCredential) =>
        UserActions.loginSuccess(<User>{
          id: userCredential.user.uid,
          name: userCredential.user.displayName,
          email: userCredential.user.email,
          photoUrl: userCredential.user.photoURL,
        })
      ),
      catchError((error) => of(UserActions.loginFailure(error)))
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MetaActions.load),
      mergeMap((action) => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(this.auth, provider);
      }),
      map((userCredential) =>
        UserActions.loginSuccess(<User>{
          id: userCredential.user.uid,
          name: userCredential.user.displayName,
          email: userCredential.user.email,
          photoUrl: userCredential.user.photoURL,
        })
      ),
      catchError((error) => of(UserActions.loginFailure(error)))
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      mergeMap((action) => signOut(this.auth)),
      map(() => UserActions.logout())
    )
  );
}
