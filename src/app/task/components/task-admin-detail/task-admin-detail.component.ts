
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './../../../shared/services/user.service';
import { Comment1 } from './../../models/comment1';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateTaskModel } from './../../models/create-task-model';
import { TaskService1 } from './../../services/task.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Task1 } from '../../models/task';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-task-admin-detail',
  templateUrl: './task-admin-detail.component.html',
  styleUrls: ['./task-admin-detail.component.scss'],
  providers: [ConfirmationService]
})
export class TaskAdminDetailComponent implements OnInit {

  id: any;
  isNew: boolean;
  createTaskModel = new CreateTaskModel();
  entityForm: FormGroup;
  progressDisplay = false;
  showUndone = false;
  cols: any;

  task: Task1 = new Task1();
  comments: Comment1[] = [];
  users: User[];
  taskToUpdate: Task1;

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private taskService: TaskService1,
    private route: ActivatedRoute,
    private userService: UserService,
    private db: AngularFirestore,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.initForm();
    this.initData();
    this.getUsers();
    this.initCols();
  }

  initCols() {
    this.cols = [
      { field: 'content', header: 'Content' },
      { field: 'userId', header: 'UserId' }
    ];
  }

  onRowSelect(event) {

  }

  getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  initForm() {
    this.entityForm = this.fb.group({
      explanation: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(50)])),
      title: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])),
      asignedId: new FormControl('', Validators.required)
    });
  }

  initData() {
    // : id
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.isNew = this.id === 'new' ? true : false;
      if (!this.isNew) {
        this.progressDisplay = true;
        this.InitObject();
      }
    });
  }

  InitObject() {
    this.db.collection('tasks').doc(this.id).ref.get().then((doc) => {
      if (doc.exists) {
        this.initTask(doc.data());
        this.patchEntityForm();
      } else {
      }
    });
  }

  initTask(smth: any) {
    Object.assign(this.task, smth);
  }

  getTask(x: any) {
    this.task = x;
  }

  patchEntityForm() {
    if (this.task.done === true) {
      this.showUndone = true;
    }
    const userId = this.task.asignedId;
    const userName = this.users.filter(x => x.uid === userId);

    const user = { userId, userName };
    this.entityForm.patchValue({
      explanation: this.task.explanation,
      title: this.task.title,
      asignedId: user.userName[0]
    });
    this.progressDisplay = false;
  }

  onSave() {
    this.progressDisplay = true;
    if (this.isNew) {
      this.createTaskModel.asignedId = this.entityForm.get('asignedId').value.uid;
      this.createTaskModel.title = this.entityForm.get('title').value;
      this.createTaskModel.explanation = this.entityForm.get('explanation').value;
      this.createTaskModel.done = false;
      this.createTaskModel.date = new Date();
      this.taskService.createTask(this.createTaskModel).then(x => { this.progressDisplay = false; });
      this.router.navigate(['tasks/admin']);
    } else {
      this.taskToUpdate = new Task1();
      this.taskToUpdate.uid = this.id;
      this.taskToUpdate.asignedId = this.entityForm.get('asignedId').value.uid;
      this.taskToUpdate.title = this.entityForm.get('title').value;
      this.taskToUpdate.explanation = this.entityForm.get('explanation').value;
      this.taskToUpdate.done = this.task.done;
      this.taskToUpdate.date = this.task.date;
      if (!this.task.comment) {
        this.taskToUpdate.comment = [];
      } else {
        this.taskToUpdate.comment = this.task.comment;
      }
      this.taskService.updateTaskAdmin(this.taskToUpdate);
      this.progressDisplay = false;
      this.router.navigate(['tasks/admin']);
    }
  }

  undoneTask() {
    this.progressDisplay = true;
    this.taskToUpdate = this.task;
    this.taskToUpdate.uid = this.id;
    this.taskToUpdate.done = false;
    this.taskService.undoneTask(this.taskToUpdate);
    this.showUndone = false;
    this.progressDisplay = false;
    this.router.navigate(['tasks/admin']);
  }

  showDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delte this task?',
      accept: () => {
          this.taskService.delteTaskAdmin(this.id);
          this.router.navigate(['tasks/admin']);
      }
  });
  }
}
