import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ForumsService } from 'src/app/services/forums.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  questions:any = []
  user: Observable<User>;

  constructor(private service: ForumsService) { }

  ngOnInit(): void {
    this.questions = this.service.getQuestions(2020, 4)
    // console.log(this.questions);
    this.user = this.userName('G9Drl5o6YmbbBmMNrnhQFNgogJQ2');
  }

  userName(uid: String) {
    return this.service.getUserInfo(uid);
  }

}
