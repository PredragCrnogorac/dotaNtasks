import { CreateTaskModel } from './../models/create-task-model';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Task1 } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService1 {

  private apiUrl = '/tasks';
  private tasksCollection: AngularFirestoreCollection<Task1>;
  private tasks: Observable<Task1[]>;
  private itemDoc: AngularFirestoreDocument<Task1>;
  private currentId;

  constructor(
    private messageService: MessageService,
    public db: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
  }

  getTasks(uid: string = '') {
    if (uid !== '') {
      this.tasksCollection = this.db.collection('tasks', ref => ref.where('asignedId', '==', uid));
    } else {
      this.tasksCollection = this.db.collection('tasks', ref => ref.orderBy('title', 'asc'));
    }
    this.tasks = this.tasksCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Task1;
        data.uid = a.payload.doc.id;
        return data;
      });
    }));
    return this.tasks;
  }

  updateTask(task: Task1) {
    this.itemDoc = this.db.doc(`tasks/${task.uid}`);
    this.itemDoc.update(task);
    this.log('success', 'You have marked your task finished!');
  }

  addComment(task: Task1) {
    this.itemDoc = this.db.doc(`tasks/${task.uid}`);
    this.itemDoc.update(task);
    this.log('success', 'You have added new comment!');
  }

  updateComment(task: Task1) {
    this.itemDoc = this.db.doc(`tasks/${task.uid}`);
    this.itemDoc.update(task);
    this.log('success', 'You have added new comment!');
  }

  undoneTask(task: Task1) {
    this.itemDoc = this.db.doc(`tasks/${task.uid}`);
    this.itemDoc.update(Object.assign({}, task));
    this.log('success', 'You have marked task unfinished!');
  }

  updateTaskAdmin(task: Task1) {
    this.itemDoc = this.db.doc(`tasks/${task.uid}`);
    this.itemDoc.update(Object.assign({}, task));
    this.log('success', 'You have updated task!');
  }

  delteTaskAdmin(uid: string) {
    this.itemDoc = this.db.doc(`tasks/${uid}`);
    this.itemDoc.delete();
    this.log('success', 'You have deleted task!');
  }

  createTask(task: CreateTaskModel): Promise<DocumentReference> {
    this.log('success', 'You have added new task!');
    return this.db.collection<CreateTaskModel>('tasks').add({...task});
  }

  private log(logType: string, message: string) {
    this.messageService.add({ severity: logType, summary: 'Task Service Message', detail: message });
  }
}
