import { AuthGuard } from './../../shared/services/auth.guard';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { LoggedInGuard } from 'src/app/shared/services/logged-in.guard';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'heroes',
    loadChildren: () => import('../../heroes/heroes.module').then(mod => mod.HeroesModule)
  },
  {
    path: 'tasks',
    loadChildren: () => import('../../task/task.module').then(mod => mod.TaskModule)
  },
  { path: 'register', component: RegisterComponent }
];
