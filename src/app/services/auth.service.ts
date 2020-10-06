import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {User} from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      }))
   }

  async googleSignin() {
    console.log('Redirecting to Google login Provider');
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    credential.user['authType']=1;
    return this.updateUserData(credential.user);
  }
  async msSignin() {
    console.log('Redirecting to MS login Provider');
    var provider = new auth.OAuthProvider('microsoft.com');
    const credential = await this.afAuth.signInWithPopup(provider);
    credential.user['authType']=2;
    return this.updateUserData(credential.user);
  }

  async signin(email,pwd) {
    const credential = await this.afAuth.signInWithEmailAndPassword(email,pwd);
    credential.user['authType']=3;
    return this.updateUserData(credential.user);
  }
  async signup(email,pwd,photoURL,name) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(email,pwd);
    await credential.user.updateProfile({
      displayName: name,
      photoURL: photoURL   
    })
    credential.user['authType']=3;
    return this.updateUserData(credential.user);
  }
  logout() {
    this.afAuth.signOut()
  }

  getLoggedUser() {
    return this.afAuth.authState
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName, 
      photoURL: user.photoURL,
      authType: user.authType
    } 

    return userRef.set(data, { merge: true })
  }

  
  async signOut() {
    await this.afAuth.signOut();
    //this.router.navigate(['/']);
  }
}