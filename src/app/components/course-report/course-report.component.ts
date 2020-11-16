import { AuthService } from 'src/app/services/auth.service';
import { ForumsService } from 'src/app/services/forums.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/question.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-course-report',
  templateUrl: './course-report.component.html',
  styleUrls: ['./course-report.component.scss']
})
export class CourseReportComponent implements OnInit {

  questions: Observable<Array<Question>>;
  user: Observable<User>;
  constructor(private forumsservice: ForumsService, private authservice: AuthService) { }

  ngOnInit(): void {
    this.user = this.authservice.user$;
    //this.user.subscribe(user => { console.log(user); });
    this.questions = this.forumsservice.getQuestions(2020, 4);
  }

}
