import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  user: firebase.User;

  constructor(
    private authService: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.authService.getLoggedUser()
      .subscribe(user => {
        this.user = user;
      })
  }

  backButton() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
