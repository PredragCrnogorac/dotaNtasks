import { UserService } from './../../../shared/services/user.service';
import { User } from 'src/app/shared/models/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Task1 } from './../../models/task';
import { TaskService1 } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-admin',
  templateUrl: './task-admin.component.html',
  styleUrls: ['./task-admin.component.scss']
})
export class TaskAdminComponent implements OnInit {

  progressBarDisplay = false;

  cols: any[];
  tasks: Task1[] = [];
  finishedTasks: Task1[] = [];
  unfinishedTasks: Task1[] = [];
  loading: false;

  searchForm: FormGroup;
  users: User[];

  constructor(
    private taskService: TaskService1,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initCols();
    this.getTasks();
    this.initForm();
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  initForm() {
    this.searchForm = this.fb.group({
      selectedUser: new FormControl('', Validators.required),
      dateFrom: new FormControl('', Validators.required),
      dateTo: new FormControl('', Validators.required),
    });
  }

  getTasks(uid: string = '') {
    this.progressBarDisplay = true;
    this.taskService.getTasks(uid).subscribe(
      (tasks) => {
        this.tasks = tasks;
        this.finishedTasks = this.tasks.filter(x => x.done === true);
        this.unfinishedTasks = this.tasks.filter(x => x.done === false);
        this.progressBarDisplay = false;
      },
      () => { },
      () => { }
    );
  }

  initCols() {
    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'date', header: 'Date' },
      { field: 'done', header: 'Done' },
      { field: 'explanation', header: 'Explanation' }
    ];
  }

  onRowSelect(event) {
    this.router.navigate(['tasks/admin', event.data.uid]);
  }

  search(dt: Table) {
    this.progressBarDisplay = true;
    let userId;
    const user = this.searchForm.get('selectedUser').value;
    if (this.valid(user)) {
      userId = user.uid;
      this.getTasks(userId);
    } else {
      this.getTasks('');
    }
  }

  valid(entity: any) {
    let valid = false;
    if (
      entity !== '' &&
      entity !== undefined &&
      entity !== null
    ) {
      valid = true;
    }
    return valid;
  }

  toTimestamp(strDate) {
    const datum = Date.parse(strDate);
    return datum / 1000;
  }

  addNew() {
    this.router.navigate(['tasks/admin', 'new']);
  }
}
