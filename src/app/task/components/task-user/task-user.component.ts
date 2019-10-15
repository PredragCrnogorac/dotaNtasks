import { UserService } from './../../../shared/services/user.service';
import { Comment1 } from '../../models/comment1';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TaskService1 } from '../../services/task.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Task1 } from '../../models/task';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-task-user',
  templateUrl: './task-user.component.html',
  styleUrls: ['./task-user.component.scss']
})
export class TaskUserComponent implements OnInit {
  currentUser: User;

  // 1 for all tasks, 2 for finished tasks, 3 for unfinished tasks
  showTasks = 1;
  display = false;
  taskToUpdate: Task1;
  // comments
  comments: Comment1[] = [];

  commentForm: FormGroup;

  tasks: Task1[] = [];
  finishedTasks: Task1[] = [];
  unfinishedTasks: Task1[] = [];
  currentTask: Task1[];
  private admins: User[];

  constructor(
    private taskService: TaskService1,
    private fb: FormBuilder,
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.user$.subscribe(y => {
      this.currentUser = y;
      this.getTasks();
    });
    this.initCommentForm();
    this.getAdmins();
  }

  initCommentForm() {
    this.commentForm = this.fb.group({
      comment: new FormControl('', Validators.required)
    });
  }

  getAdmins() {
    this.userService.getAdmins().subscribe(x => {
      this.admins = x;
    });
  }

  ifAdmin(uid: string): boolean {
    return this.admins.filter(x => x.uid === uid).length > 0;
  }

  getAdminName(uid: string) {
    return this.admins.find(x => x.uid === uid).displayName;
  }

  leaveComment(task) {
    this.taskToUpdate = task;
    this.display = true;
  }
  addComment() {
    if (!this.taskToUpdate.comment) {
      this.taskToUpdate.comment = [];
    }
    this.taskToUpdate.comment.push({ content: this.commentForm.get('comment').value, userId: this.currentUser.uid });
    this.comments = this.taskToUpdate.comment;
    this.taskService.addComment(this.taskToUpdate);
    this.display = false;
  }
  showComments(task: Task1) {
    this.comments = task.comment;
  }
  getTasks() {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        if (this.currentUser) {
          this.tasks = tasks.filter(x => x.asignedId === this.currentUser.uid);
        } else {
          this.tasks = tasks.filter(x => x.asignedId === '2');
        }
        this.finishedTasks = this.tasks.filter(x => x.done === true);
        this.unfinishedTasks = this.tasks.filter(x => x.done === false);
      },
      () => { },
      () => { }
    );
  }

  showAllTasks() {
    this.showTasks = 1;
  }

  showFinishedTasks() {
    this.showTasks = 2;
  }

  showUnfinishedTasks() {
    this.showTasks = 3;
  }

  finishTask(task: Task1) {
    this.taskToUpdate = task;
    this.taskToUpdate.done = true;
    this.taskService.updateTask(this.taskToUpdate);
    this.display = false;
  }

  openAdminPanel(){
    this.router.navigate(['tasks/admin']);
  }
}
