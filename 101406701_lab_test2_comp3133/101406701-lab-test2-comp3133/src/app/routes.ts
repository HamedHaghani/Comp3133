import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./missionlist/missionlist.component').then(m => m.MissionlistComponent)
  }
];
