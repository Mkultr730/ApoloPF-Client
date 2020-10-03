import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: firebase.User;

  constructor(
    private service: LoginService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.service.getLoggedUser()
      .subscribe( user => {
        console.log(user);
        this.user = user;
      });
  }

  loginGoogle() {
    console.log('Login...');
    this.service.loginGoogle();
  }

  logout(){
    this.service.logout()
  }

}
