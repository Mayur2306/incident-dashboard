import { Routes } from '@angular/router';
import { IncidentDetailComponent } from './incident-detail/incident-detail.component';
import { IncidentListComponent } from './incident-list/incident-list.component';

export const routes: Routes = [
  {
    path: '',
    component: IncidentListComponent,
    title: 'Incident Dashboard'
  },
  {
    path: 'incident/:id',
    component: IncidentDetailComponent,
    title: 'Incident details'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
