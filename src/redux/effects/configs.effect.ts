import { Injectable, Injector } from '@angular/core';
import * as ConfigsActions from '../actions/configs.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  collection,
  docSnapshots,
  doc,
  Firestore,
} from '@angular/fire/firestore';
import { catchError, from, map, mergeMap, of, switchMap } from 'rxjs';
import { Configs } from 'src/models/configs.model';

@Injectable()
export class ConfigsEffects {
  constructor(private actions$: Actions, private firestore: Firestore) {}

  fetchConfigs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigsActions.fetch),
      switchMap(() => {
        return docSnapshots(doc(this.firestore, 'configs', 'main'));
      }),
      map((snapshot) => {
        console.log(snapshot.data() as Configs);
        return ConfigsActions.fetchSuccess(snapshot.data() as Configs);
      }),
      catchError((error) => of(ConfigsActions.fetchError(error)))
    )
  );
}
