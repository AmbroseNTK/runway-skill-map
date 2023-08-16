import { Injectable } from '@angular/core';
import * as profileActions from '../actions/profile.action';
import { ProfileState } from '../states/profile.state';
import { Actions } from '@ngrx/effects';

import { createEffect, ofType } from '@ngrx/effects';

import {
  Firestore,
  collection,
  doc,
  getDoc,
  updateDoc,
  getCountFromServer,
  query,
  setDoc,
  orderBy,
  startAfter,
  limit,
  getDocs,
  deleteDoc,
} from '@angular/fire/firestore';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Profile } from 'src/models/profile.model';
import { Skill } from 'src/models/skill.model';

@Injectable()
export class ProfileEffects {
  constructor(private actions$: Actions, private firestore: Firestore) {}

  getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.get),
      mergeMap((action) => {
        return getDoc(doc(this.firestore, 'profiles', action.id));
      }),
      map((profile) => profileActions.getSuccess(profile.data() as Profile)),
      catchError((error) => of(profileActions.getFailure(error)))
    )
  );

  countSkills$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.countSkills),
      mergeMap((action) => {
        return getCountFromServer(
          query(collection(this.firestore, 'profiles', action.id, 'skills'))
        );
      }),
      map((countSkills) =>
        profileActions.countSkillsSuccess(countSkills.data().count)
      ),
      catchError((error) => of(profileActions.countSkillsFailure(error)))
    )
  );

  checkSkill$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.checkSkill),
      mergeMap((action) => {
        // create a skill in subcollection of the user profile
        let skillCollection = collection(
          this.firestore,
          'profiles',
          action.id,
          'skills'
        );
        let newDoc = doc(skillCollection, action.skill.id);
        console.log(action.skill);
        return setDoc(newDoc, action.skill);
      }),
      map((skill) => profileActions.checkSkillSuccess()),
      catchError((error) => {
        console.log(error);
        return of(profileActions.checkSkillFailure(error));
      })
    )
  );

  uncheckSkill$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.uncheckSkill),
      mergeMap((action) => {
        // delete a skill in subcollection of the user profile
        let skillDoc = doc(
          this.firestore,
          'profiles',
          action.id,
          'skills',
          action.skillId
        );
        return deleteDoc(skillDoc);
      }),
      map((skill) => profileActions.uncheckSkillSuccess()),
      catchError((error) => of(profileActions.uncheckSkillFailure(error)))
    )
  );

  listSkills$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.listSkills),
      mergeMap((action) => {
        // list skills in subcollection of the user profile pagination
        let skillCollection = collection(
          this.firestore,
          'profiles',
          action.id,
          'skills'
        );
        let skillQuery = query(
          skillCollection,
          orderBy('addedDate', 'desc'), // Sort by name
          startAfter(action.lastDocId), // Start after the last skill in the previous page
          limit(10) // Limit the number of skills in the page
        );
        // query docs
        return getDocs(skillQuery);
      }),
      map((querySnapshot) => {
        let skills: Skill[] = [];
        querySnapshot.forEach((doc) => {
          skills.push(doc.data() as Skill);
        });
        console.log('skills', skills);
        return profileActions.listSkillsSuccess(skills);
      }),
      catchError((error) => of(profileActions.listSkillsFailure(error)))
    )
  );

  isSkillExisted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.isSkillExisted),
      mergeMap((action) => {
        // check if a skill is existed in subcollection of the user profile

        let skillDoc = doc(
          this.firestore,
          'profiles',
          action.id,
          'skills',
          action.skillId
        );
        return getDoc(skillDoc);
      }),
      map((skill) => {
        if (skill.exists()) {
          return profileActions.isSkillExistedSuccess(true);
        } else {
          return profileActions.isSkillExistedSuccess(false);
        }
      }),
      catchError((error) => {
        console.log(error);
        return of(profileActions.isSkillExistedFailure(error));
      })
    )
  );
}
