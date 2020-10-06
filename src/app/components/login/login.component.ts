import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: firebase.User;
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  constructor(
    private service: AuthService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.service.getLoggedUser()
      .subscribe( user => {
        this.user = user;
      });
  }

  googleSignin() {
    console.log('Login...');
    this.service.googleSignin();
  }

  msSignin() {
    console.log('Login...');
    this.service.msSignin();
  }
  signin(email, pwd) {
    console.log('Login...');
    this.service.signin(email, pwd);
  }
  signup(email, pwd, photoURL, name){
    console.log('Resgistrando...');
    this.service.signup(email, pwd, photoURL, name);
  }
  logout(){
    this.service.logout();
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
