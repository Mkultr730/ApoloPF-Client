import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { User } from '../models/user.model';
import { Course } from '../models/course.model';
import { Question } from '../models/question.model'
import {Answer} from '../models/answer.model'


@Injectable({
  providedIn: 'root'
})
export class ForumsService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getUserInfo(uid: String) {
    return this.afs.doc<User>(`users/${uid}`).valueChanges();
  }

  async newQuestion(question:string,uid:string,year:number,school_YYYY:number){
    const questionobj:Question ={
      madeby:uid,
      text:question,
      answers: []
    };
    const response=await this.afs.collection(`forums/${year}/${school_YYYY}/`).add(questionobj);
    // console.log(response.id);
    return response;
  }

  async answerQuestion(questionid:string,userid:string,textanswer:string,year:number,school_YYYY:number){

    const questionRef = this.afs.collection(`forums/${year}/${school_YYYY}`).doc(questionid);
    let questionmod: Question;
    //get current info from the course
    await questionRef.get().toPromise().then(function (doc) {
      if (doc.exists) {
        // console.log("Document data:", doc.data());
        questionmod = doc.data() as Question;
        const newAnswer:Answer={uid:userid,text:textanswer};
        questionmod['answers'].push(newAnswer);
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    //adding professor to the course
    await questionRef.set(questionmod)
  }

  async deleteQuestion(questionid:string,year:number,school_YYYY:number){
    await this.afs.collection(`forums/${year}/${school_YYYY}/`).doc(questionid).delete();
  }

  async getQuestions(year: number, school_YYYY: number) {
    const questionRef = this.afs.collection(`forums/${year}/${school_YYYY}`);
    // console.log(allQuestions);
    return await questionRef.get().valueChanges({ idField: 'id' }).map(querySnapshot => {
        querySnapshot.forEach(question => {
            allQuestions.push(question.data() as Question);
        });
    });
  }

  // async getQuestions(year:number,school_YYYY:number){
  //   let allQuestions: any = []
  //   const questionRef = this.afs.collection(`forums/${year}/${school_YYYY}`);
  //   await questionRef
  //     .get().toPromise()
  //     .then(function (querySnapshot) {
  //       //iterate all the questions
  //         querySnapshot.forEach(async (question) => {
  //           // console.log(question.id)
  //           // console.log(question.data())
  //           allQuestions.push(question.data() as Question)
  //         });
  //       });
  //   // console.log(allQuestions);
  //   return allQuestions;
  // }
}


