import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ApoloPF-Client';

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ){}

  ngOnInit(){
  }

}
