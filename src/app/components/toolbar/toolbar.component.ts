import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  user: firebase.User

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getLoggedUser()
      .subscribe(user => {
        this.user = user;
      })
  }

}
