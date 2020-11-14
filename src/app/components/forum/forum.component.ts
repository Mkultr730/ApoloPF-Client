import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/question.model';
import { User } from 'src/app/models/user.model';
import { ForumsService } from 'src/app/services/forums.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  questions: Observable<Array<Question>>;
  user: Observable<User>;

  constructor(private service: ForumsService) { }

  ngOnInit(): void {
    this.questions = this.service.getQuestions(2020, 4);
  }

}
