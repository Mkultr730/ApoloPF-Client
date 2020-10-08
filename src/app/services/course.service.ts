import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {User} from '../models/user.model';
import {Course} from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private afs: AngularFirestore
  ) { }

  createCourse(coursename:String){
    const course:Course={
    uid:"as",
    coursename:"as",
    teacher:[],
    students:[]
    }
    return new Promise<any>((resolve, reject) =>{
      this.afs
          .collection("coffeeOrders")
          .add(course)
          .then(res => {}, err => reject(err));
  });
  }
}
