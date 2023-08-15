import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillPanelComponent } from './skill-panel/skill-panel.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {
    path: 'map',
    component: MapComponent,
  },
  {
    path: '**',
    redirectTo: 'map',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
