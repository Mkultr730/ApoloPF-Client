import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.getLoggedUser()
      .subscribe( user => {
        this.user = user;
        if (this.user) { this.router.navigate([ '/' ]); }
      });
  }

  async googleSignin() {
    console.log('Login...');
    await this.service.googleSignin();
    if (this.user) { this.router.navigate([ '/' ]); }
  }

  async msSignin() {
    console.log('Login...');
    await this.service.msSignin();
    if (this.user) { this.router.navigate([ '/' ]); }
  }

  async signin(email, pwd) {
    console.log('Login...');
    await this.service.signin(email, pwd);
    if (this.user) { this.router.navigate([ '/' ]); }
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
