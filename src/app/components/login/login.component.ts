import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: firebase.User;

  constructor(
    private service: AuthService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.service.getLoggedUser()
      .subscribe( user => {
        console.log(user);
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
  signin(email,pwd) {
    console.log('Login...');
    this.service.signin(email,pwd);
  }
  signup(email,pwd,photoURL,name){
    console.log('Resgistrando...');
    this.service.signup(email,pwd,photoURL,name)
  }
  logout(){
    this.service.logout()
  }

}
