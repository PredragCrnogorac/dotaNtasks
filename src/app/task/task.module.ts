import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TaskUserComponent } from './components/task-user/task-user.component';
import { TaskAdminComponent } from './components/task-admin/task-admin.component';
import { TaskAdminDetailComponent } from './components/task-admin-detail/task-admin-detail.component';



@NgModule({
  declarations: [TaskUserComponent, TaskAdminComponent, TaskAdminDetailComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedModule
  ]
})
export class TaskModule { }
