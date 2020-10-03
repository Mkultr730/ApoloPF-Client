import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  loginGoogle() {
    console.log('Redirecting to Google login Provider');
    this.afAuth.signInWithRedirect(new auth.GoogleAuthProvider)
  }

  logout() {
    this.afAuth.signOut()
  }

  getLoggedUser() {
    return this.afAuth.authState
  }
}
