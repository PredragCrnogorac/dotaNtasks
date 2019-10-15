import { AuthGuard } from './../shared/services/auth.guard';
import { TaskUserComponent } from './components/task-user/task-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskAdminComponent } from './components/task-admin/task-admin.component';
import { TaskAdminDetailComponent } from './components/task-admin-detail/task-admin-detail.component';

const routes: Routes = [
  {
    path: '', component: TaskUserComponent
  },
  {
    path: 'admin', component: TaskAdminComponent, canActivate: [AuthGuard]
  },
  {
    path: 'admin/:id', component: TaskAdminDetailComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
