import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
  TuiButtonModule,
  TuiTextfieldControllerModule,
  TuiHintModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { SkillPanelComponent } from './skill-panel/skill-panel.component';
import { NavbarComponent } from './navbar/navbar.component';
import {
  TuiAvatarModule,
  TuiInputModule,
  TuiInputSliderModule,
  TuiIslandModule,
  TuiProgressModule,
  TuiTabsModule,
} from '@taiga-ui/kit';
import { ZoomerComponent } from './zoomer/zoomer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { providePerformance, getPerformance } from '@angular/fire/performance';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { TuiSidebarModule, TuiTabBarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule, TuiPanModule } from '@taiga-ui/cdk';
import { SideDrawerComponent } from './side-drawer/side-drawer.component';
import { userReducer } from 'src/redux/reducers/user.reducer';
import { UserEffects } from 'src/redux/effects/user.effect';
import { metaReducer } from 'src/redux/reducers/meta.reducer';
import { skillReducer } from 'src/redux/reducers/skill.reducer';
import { SkillEffects } from 'src/redux/effects/skill.effect';
import { profileReducer } from 'src/redux/reducers/profile.reducer';
import { ProfileEffects } from 'src/redux/effects/profile.effect';
import { configReducer } from 'src/redux/reducers/configs.reducer';
import {
  getRemoteConfig,
  provideRemoteConfig,
} from '@angular/fire/remote-config';
import { ConfigsEffects } from 'src/redux/effects/configs.effect';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SkillPanelComponent,
    NavbarComponent,
    ZoomerComponent,
    SideDrawerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiButtonModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiHintModule,
    TuiInputModule,
    TuiInputSliderModule,
    TuiSidebarModule,
    TuiActiveZoneModule,
    TuiTabBarModule,
    TuiTabsModule,
    TuiSvgModule,
    TuiAvatarModule,
    TuiIslandModule,
    TuiProgressModule,
    TuiPanModule,
    TuiAlertModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideStorage(() => getStorage()),
    provideRemoteConfig(() => getRemoteConfig()),
    StoreModule.forRoot(
      {
        user: userReducer,
        meta: metaReducer,
        skill: skillReducer,
        profile: profileReducer,
        configs: configReducer,
      },
      {}
    ),
    EffectsModule.forRoot([
      UserEffects,
      SkillEffects,
      ProfileEffects,
      ConfigsEffects,
    ]),
  ],
  providers: [
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    ScreenTrackingService,
    UserTrackingService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
