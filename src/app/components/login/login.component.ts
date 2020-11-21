import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  user: firebase.User;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = '';
  hide = true;
  casa = '';

  constructor(
    private service: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.getLoggedUser()
      .subscribe(user => {
        this.user = user;
        if (this.user) { this.router.navigate(['/']); }
      });

    // (document.querySelector('.mdk-drawer.js-mdk-drawer.layout-mini__drawer') as HTMLDivElement).style.display = 'none';
    // (document.querySelector('.navbar.navbar-expand.navbar-light.border-bottom-2') as HTMLDivElement).style.display = 'none';
  }

  async googleSignin() {
    console.log('Login...');
    await this.service.googleSignin();
    if (this.user) { this.router.navigate(['/']); }
  }

  async msSignin() {
    console.log('Login...');
    await this.service.msSignin();
    if (this.user) { this.router.navigate(['/']); }
  }

  async signin() {
    console.log('Login...');
    await this.service.signin(this.email.value, this.password);
    if (this.user) { this.router.navigate(['/']); }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnDestroy() {
    (document.querySelector('.mdk-drawer.js-mdk-drawer.layout-mini__drawer') as HTMLDivElement).style.display = 'block';
    (document.querySelector('.navbar.navbar-expand.navbar-light.border-bottom-2') as HTMLDivElement).style.display = 'flex';
  }

}
