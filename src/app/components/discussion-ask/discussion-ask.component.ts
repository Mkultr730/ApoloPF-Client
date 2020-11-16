import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ForumsService } from 'src/app/services/forums.service';

@Component({
  selector: 'app-discussion-ask',
  templateUrl: './discussion-ask.component.html',
  styleUrls: ['./discussion-ask.component.scss']
})
export class DiscussionAskComponent implements OnInit {

  questionForm = new FormGroup({
    title: new FormControl(''),
    details: new FormControl(''),
  });

  grade: number;

  constructor(private forumService: ForumsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      user.Course?.get().then( course => {
        this.grade = course.data().grado;
      })
    })
  }

  submitQuestion() {
    console.log(this.questionForm.value?.title, this.authService.uid, new Date().getFullYear(), this.grade, this.questionForm.value?.details)
    this.forumService.newQuestion(this.questionForm.value?.title, this.authService.uid, new Date().getFullYear(), this.grade, this.questionForm.value?.details);
    this.questionForm.controls.title.setValue('')
    this.questionForm.controls.details.setValue('');
  }

}
