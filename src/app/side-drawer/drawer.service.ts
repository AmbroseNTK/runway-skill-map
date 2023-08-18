import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  openStateChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  showInfo: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showProfile: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  selectedSkillId = '';

  constructor() {}

  close() {
    this.openStateChange.next(false);
  }

  enableInfo(enabled: boolean) {
    this.showInfo.next(enabled);
  }

  enableProfile(enabled: boolean) {
    this.showProfile.next(enabled);
  }
}
