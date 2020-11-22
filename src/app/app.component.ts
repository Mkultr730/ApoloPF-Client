import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ApoloPF-Client';
  user;

  constructor(private auth: AuthService,private router: Router) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user=user);
  }

  logout() {
    this.auth.logout();
    this.auth.user$.subscribe(user => {
      this.user=user
      this.router.navigateByUrl('/login');
    });
  }
}
