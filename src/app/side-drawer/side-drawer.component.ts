import { Component, Input } from '@angular/core';
import { DrawerService } from './drawer.service';
import { Store } from '@ngrx/store';
import { SkillState } from 'src/redux/states/skill.state';
import { ProfileState } from 'src/redux/states/profile.state';
import { UserState } from 'src/redux/states/user.state';
import { Skill } from 'src/models/skill.model';
import * as ProfileActions from 'src/redux/actions/profile.action';
import { User } from 'src/models/user.model';
import { combineLatest, combineLatestAll, map, merge, of } from 'rxjs';
import * as SkillActions from 'src/redux/actions/skill.action';
import { Timestamp } from '@angular/fire/firestore';

import * as UserActions from 'src/redux/actions/user.action';

@Component({
  selector: 'app-side-drawer',
  templateUrl: './side-drawer.component.html',
  styleUrls: ['./side-drawer.component.scss'],
})
export class SideDrawerComponent {
  constructor(
    public drawer: DrawerService,
    private store: Store<{
      skill: SkillState;
      profile: ProfileState;
      user: UserState;
    }>
  ) {
    // combine user$ and selectedSkill$ to check if the skill is checked
    combineLatest([this.user$, this.selectedSkill$]).subscribe(
      ([user, skill]) => {
        if (user && skill) {
          this.store.dispatch(ProfileActions.isSkillExisted(user.id, skill.id));
        }
      }
    );
    this.store.dispatch(SkillActions.count());
    this.skillList$.subscribe((skills) => {
      for (let skill of skills) {
        if (this.loadedSkillList.find((s) => s.id == skill.id)) {
          continue;
        }
        this.loadedSkillList.push(skill);
      }
    });
  }
  selectedIndex = 0;

  selectedSkill$ = this.store.select((state) => state.skill.selectedSkill);

  user$ = this.store.select((state) => state.user.loggedUser);

  skillExisted$ = this.store.select((state) => state.profile.skillExisted);
  isLoading$ = this.store.select((state) => state.profile.loading);

  countAllSkills$ = this.store.select((state) => state.skill.countedSkills);
  countMySkills$ = this.store.select((state) => state.profile.skillCount);

  worldmapProgress$ = of(this.countAllSkills$, this.countMySkills$).pipe(
    combineLatestAll(),
    map(([all, my]) => {
      return (my / all) * 100;
    })
  );

  skillList$ = this.store.select((state) => state.profile.skillList);

  loadedSkillList: Skill[] = [];

  checkSkill(uid: string, skill: Skill) {
    let clonedSkill = {
      id: skill.id,
      name: skill.name,
      parentId: skill.parentId,
      addedDate: new Date(),
    } as Skill;
    console.log('setSkill', uid, clonedSkill);
    this.store.dispatch(ProfileActions.checkSkill(uid, clonedSkill));
    this.store.dispatch(ProfileActions.isSkillExisted(uid, clonedSkill.id));
    this.store.dispatch(ProfileActions.countSkills(uid));
  }

  uncheckSkill(uid: string, skillId: string) {
    console.log('unsetSkill', uid, skillId);
    this.store.dispatch(ProfileActions.uncheckSkill(uid, skillId));
    this.store.dispatch(ProfileActions.isSkillExisted(uid, skillId));
    this.store.dispatch(ProfileActions.countSkills(uid));
  }

  getDateString(date: any) {
    date = date as Timestamp;
    return date.toDate().toLocaleDateString();
  }

  logout() {
    this.store.dispatch(UserActions.logout());
    this.loadedSkillList = [];
    window.location.href = '/';
  }
}
