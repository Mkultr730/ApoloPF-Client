import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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

  newQuestion(question: string, uid: string, year: number, schoolYYYY: number) {
    return this.afs.collection(`forums/${year}/${schoolYYYY}/`).add({
      madeby: uid,
      text: question,
      answers: []
    });
  }

  answerQuestion(questionid: string, userid: string, textanswer: string, year: number, schoolYYYY: number) {
    const questionRef = this.afs.collection(`forums/${year}/${schoolYYYY}`).doc<Question>(questionid);
    questionRef.valueChanges().subscribe(question => {
      question.answers.push({ uid: userid, text: textanswer });
      questionRef.update({ answers: question.answers });
    });
  }

  deleteQuestion(questionid: string, year: number, schoolYYYY: number) {
    this.afs.collection(`forums/${year}/${schoolYYYY}/`).doc(questionid).delete();
  }

  getQuestions(year: number, schoolYYYY: number) {
    return this.afs.collection<Question>(`forums/${year}/${schoolYYYY}`).valueChanges();
  }
}


