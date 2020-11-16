import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ForumsService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getUserInfo(uid: string) {
    return this.afs.doc<User>(`users/${uid}`).valueChanges();
  }

  newQuestion(question: string, uid: string, year: number, schoolYYYY: number, details: string) {
    return this.afs.collection(`forums/${year}/${schoolYYYY}/`).add({
      answers: [],
      details: details,
      madeby: this.afs.doc(`users/${uid}`).ref,
      question: question,
    });
  }

  answerQuestion(questionid: string, userid: string, textanswer: string, grade: number, year: number) {
    const questionRef = this.afs.doc<Question>(`/forums/${year}/${grade}/${questionid}`);
    questionRef.get().subscribe(question => {
      const questionVal = question.data() as  Question;
      questionVal.answers.push({ uid: this.afs.doc(`users/${userid}`).ref, text: textanswer });
      questionRef.update({ answers: questionVal.answers });
    });
  }

  deleteQuestion(questionid: string, year: number, schoolYYYY: number) {
    this.afs.collection(`forums/${year}/${schoolYYYY}/`).doc(questionid).delete();
  }

  getQuestions(year: number, schoolYYYY: number) {
    return this.afs.collection<Question>(`forums/${year}/${schoolYYYY}`).valueChanges({idField: 'id'});
  }

  getQuestion(year: number, schoolYYYY: number, questionId: string) {
    return this.afs.collection<Question>(`forums/${year}/${schoolYYYY}`).doc(questionId).valueChanges();
  }

}


