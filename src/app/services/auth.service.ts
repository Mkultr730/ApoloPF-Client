import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {User} from '../models/user.model';
import { Router } from '@angular/router';
import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  uid: string;

  constructor(
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
      private router: Router,
      private courseService: CourseService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          this.uid = user.uid;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      }));
   }

  async googleSignin() {
    console.log('Redirecting to Google login Provider');
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    credential.user['authType'] = 1;
    return this.updateUserData(credential.user);
  }
  async msSignin() {
    console.log('Redirecting to MS login Provider');
    const provider = new auth.OAuthProvider('microsoft.com');
    const credential = await this.afAuth.signInWithPopup(provider);
    credential.user['authType'] = 2;
    return this.updateUserData(credential.user);
  }

  async signin(email:string, pwd:string) {
    const credential = await this.afAuth.signInWithEmailAndPassword(email, pwd);
    credential.user['authType'] = 3;
    return this.updateUserData(credential.user);
  }
  async signup(email:string, pwd:string, name:string, courseId:string, grado: string) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, pwd);
    await credential.user.updateProfile({
      displayName: name
    });
    credential.user['authType'] = 3;
    await this.updateUserData(credential.user);
    return this.courseService.assingStudent(credential.user.uid,courseId,2020,grado)
  }
  logout() {
    this.afAuth.signOut();
  }

  getLoggedUser() {
    return this.afAuth.authState;
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      authType: user.authType,
    };

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}
