import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Question } from 'src/app/models/question.model';
import { AuthService } from 'src/app/services/auth.service';
import { ForumsService } from 'src/app/services/forums.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {
  private idSub: Subscription;
  questionId: string;
  year: number;
  grade: number;
  question: Question;

  newAnswer = new FormControl('');

  constructor(private route: ActivatedRoute, private forumService: ForumsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.idSub = this.route.params.subscribe(params => {
      this.questionId = params.id;
      this.grade = params.grade;
      this.year = params.year;
    });
    this.forumService.getQuestion(this.year, this.grade, this.questionId).subscribe( question => {
      this.question = question as Question;
    });
  }

  postComment() {
    this.forumService.answerQuestion(this.questionId, this.authService.uid, this.newAnswer.value, this.grade, this.year)
    this.newAnswer.setValue('');
  }

}
