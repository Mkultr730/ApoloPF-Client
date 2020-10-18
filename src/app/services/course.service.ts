import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private afs: AngularFirestore
  ) { }

  createCourse(course_name: string, school_YYYY: number) {
    const course: Course = {
      coursename: course_name,
      teacher: [],
      students: [],
    };
    return new Promise<any>((resolve, reject) => {
      this.afs
        .collection(`courses/${new Date().getFullYear()}/${school_YYYY}`)
        .add(course)
        .then(
          res => {
            console.log(res.id);
            return { 'courseid': res.id };
          },
          err => {
            reject(err)
          });
    });
  }

  async deleteCourse(courseid: string, Current_YYYY: number, school_YYYY: number) {
    const courseRef = this.afs.collection(`courses/${Current_YYYY}/${school_YYYY}`).doc(courseid);
    let courseinfo: Course;

    await courseRef
      .get().toPromise()
      .then((doc) => {
        courseinfo = doc.data() as Course;
      })
    if (courseinfo === undefined) {
      return "Curso no encontrado"
    } else {
      
      console.log(courseinfo)
      //const teacherRef = this.afs.collection(`users/`).doc();
      for (let teacher of courseinfo["teacher"]) {
        await this.deleteTeacherFromCourse(teacher, courseid, Current_YYYY, school_YYYY);
      }
      for (let student of courseinfo["students"]) {
        await this.deleteStudentFromCourse(student, courseid, Current_YYYY, school_YYYY);
      }
      await courseRef.delete().then((res)=>{console.log("Eliminado ")})
      return "eliminado"
    }
  }

  async listCourses(Current_YYYY: number) {
    let allcourses: any = {}
    const Academic_year: string[] = ["4th", "5th"]
    for (let year of Academic_year) {
      allcourses[year] = [];
      const courseRef = this.afs.collection(`courses/${Current_YYYY}/${year === "4th" ? "4" : "5"}`);
      //get all the courses id from the nth year
      await courseRef
        .get().toPromise()
        .then(function (querySnapshot) {
          //iterate all the couses _nth year_
          querySnapshot.forEach(async (courseCollection) => {
            //get coursekey and set it to the custom object
            const courseKey: string = courseCollection.id;
            allcourses[year][courseKey] = {};
            //insert info to the custom object
            await courseRef.doc(courseKey)
              .get().toPromise()
              .then((doc) => {
                const temp: Course = doc.data() as Course;
                Object.assign(allcourses[year][courseKey], temp);
              });
          });
        });
    }
    return allcourses;
  }

  async assingTeacher(teacherid: string, courseid: string, Current_YYYY: number, school_YYYY: number) {

    const courseRef = this.afs.collection(`courses/${Current_YYYY}/${school_YYYY}`).doc(courseid);
    const teacherRef = this.afs.collection(`users/`).doc(teacherid);
    let cursomod: Course;
    let teacherInfo: User;
    //get current professors from the course
    await courseRef.get().toPromise().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        cursomod = doc.data() as Course;
        cursomod['teacher'].push(teacherid)
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    //adding professor to the course
    await courseRef.set(cursomod)
    //get current professor courses
    await teacherRef.get().toPromise().then(function (doc) {
      if (doc.exists) {
        teacherInfo = doc.data() as User;
        console.log(teacherInfo["courses"] === undefined)
        if (teacherInfo["courses"] === undefined) {
          teacherInfo["courses"] = []
        }
        teacherInfo["courses"].push(courseid);
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    //adding course to the professor
    await teacherRef.set(teacherInfo);
  }

  async assingStudent(studentid: string, courseid: string, Current_YYYY: number, school_YYYY: number) {

    const courseRef = this.afs.collection(`courses/${Current_YYYY}/${school_YYYY}`).doc(courseid);
    const studentRef = this.afs.collection(`users/`).doc(studentid);
    let cursomod: Course;
    let studentInfo: User;
    //get current info from the course
    await courseRef.get().toPromise().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        cursomod = doc.data() as Course;
        cursomod['students'].push(studentid)
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    //adding professor to the course
    await courseRef.set(cursomod)
    //get current professor courses
    await studentRef.get().toPromise().then(function (doc) {
      if (doc.exists) {
        studentInfo = doc.data() as User;
        studentInfo["course"] = courseid
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    //adding course to the professor
    await studentRef.set(studentInfo);
  }

  async deleteTeacherFromCourse(teacherid: string, courseid: string, Current_YYYY: number, school_YYYY: number) {

    const courseRef = this.afs.collection(`courses/${Current_YYYY}/${school_YYYY}`).doc(courseid);
    const teacherRef = this.afs.collection(`users/`).doc(teacherid);
    let cursomod: Course;
    let teacherInfo: User;
    await courseRef.get().toPromise().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        cursomod = doc.data() as Course;
        cursomod['teacher'] = cursomod['teacher'].filter((uid) => { return uid != teacherid })
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

    //deleting professor from the course
    await courseRef.set(cursomod)

    //get current professor courses
    await teacherRef.get().toPromise().then(function (doc) {
      if (doc.exists) {
        teacherInfo = doc.data() as User;
        console.log(teacherInfo["courses"] === undefined)
        if (teacherInfo["courses"] === undefined) {
          teacherInfo["courses"] = []
        }
        teacherInfo["courses"] = teacherInfo["courses"].filter((cid) => { return cid != courseid })
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    //deleting course from the professor
    await teacherRef.set(teacherInfo);
  }

  async deleteStudentFromCourse(studentid: string, courseid: string, Current_YYYY: number, school_YYYY: number) {

    const courseRef = this.afs.collection(`courses/${Current_YYYY}/${school_YYYY}`).doc(courseid);
    const teacherRef = this.afs.collection(`users/`).doc(studentid);
    let cursomod: Course;
    let studentInfo: User;
    await courseRef.get().toPromise().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        cursomod = doc.data() as Course;
        cursomod['students'] = cursomod['students'].filter((uid) => { return uid != studentid })
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

    //deleting student from the course
    await courseRef.set(cursomod)

    //get student course
    await teacherRef.get().toPromise().then(function (doc) {
      if (doc.exists) {
        studentInfo = doc.data() as User;
        delete studentInfo["course"]
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    //deleting course from the student
    await teacherRef.set(studentInfo);
  }

}