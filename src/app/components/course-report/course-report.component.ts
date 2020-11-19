import { AuthService } from 'src/app/services/auth.service';
import { ForumsService } from 'src/app/services/forums.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/question.model';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-report',
  templateUrl: './course-report.component.html',
  styleUrls: ['./course-report.component.scss']
})
export class CourseReportComponent implements OnInit {

  questions: Observable<Array<Question>>;
  user: Observable<User>;
  cid: any;
  constructor(private forumsservice: ForumsService, private authservice: AuthService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = this.authservice.user$;
    this.questions = this.forumsservice.getQuestions(2020, 4);
    this.cid = this.route.snapshot.paramMap.get('cid');
  }

}
