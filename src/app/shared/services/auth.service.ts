import { User } from './../models/user';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { RegisterUser } from '../models/register-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();

  user$: Observable<User>;
  newUser: RegisterUser;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    await this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roles: { reader: true }
    };

    return userRef.set(data, { merge: true });
  }

  async createUser(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCreatential => {
        this.newUser = user;
        this.updateUserData(userCreatential.user);
        userCreatential.user.updateProfile({
          displayName: user.username
        });

        this.insertUserData(userCreatential)
          .then(() => {
            this.router.navigate(['/']);
          });

      })
      .catch(error => {
        this.eventAuthError.next(error);
      });
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`users/${userCredential.user.uid}`).set({
      username: this.newUser.username,
      firstName: this.newUser.username,
      lastName: this.newUser.username,
      email: this.newUser.email,
      password: this.newUser.password,
      roles: { reader: true }
    });
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    const x = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        this.updateUserData(userCredential.user);
      })
      .catch(err => {
      });
  }

}
