import { Injectable } from '@angular/core';
import * as SkillActions from '../actions/skill.action';
import {
  getDoc,
  Firestore,
  collection,
  doc,
  getCountFromServer,
} from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, mergeMap, of } from 'rxjs';
import { Skill } from 'src/models/skill.model';

@Injectable()
export class SkillEffects {
  constructor(private action$: Actions, private firestore: Firestore) {}

  getSkill$ = createEffect(() =>
    this.action$.pipe(
      ofType(SkillActions.get),
      mergeMap((action) => {
        let skillCollection = collection(this.firestore, 'skills');
        // get doc by id
        let skillDoc = doc(skillCollection, action.id);
        return from(getDoc(skillDoc));
      }),
      map((skillDoc) => {
        let skill = skillDoc.data();
        return SkillActions.getSuccess(skill as Skill);
      }),
      catchError((error) => of(SkillActions.getFailure(error)))
    )
  );

  countSkills$ = createEffect(() =>
    this.action$.pipe(
      ofType(SkillActions.count),
      mergeMap((action) => {
        return getCountFromServer(collection(this.firestore, 'skills'));
      }),
      map((count) => SkillActions.countSuccess(count.data().count)),
      catchError((error) => of(SkillActions.countFailure(error)))
    )
  );
}
