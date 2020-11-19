import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, concat } from 'rxjs';
import { Course } from '../models/course.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private afs: AngularFirestore) { }

  listCourses(year: number) {
    let allcourses: Observable<Array<Course>> = null;
    const grades: string[] = ['4', '5'];
    for (const grade of grades) {
      const courseRef = this.afs.collection<Course>(`courses/${year}/${grade}`);
      if (allcourses) {
        allcourses = concat(allcourses, courseRef.valueChanges());
      } else {
        allcourses = courseRef.valueChanges();
      }
    }
    return allcourses;
  }

  createCourse(courseName: string, schoolYYYY: number) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(`courses/${new Date().getFullYear()}/${schoolYYYY}`).add({
        coursename: courseName,
        teacher: [],
        students: [],
      }).then(
        res => { resolve({ courseid: res.id }); },
        err => { reject(err); });
    });
  }

  async deleteCourse(courseid: string, CurrentYYYY: number, schoolYYYY: number) {
    const courseRef = this.afs.collection(`courses/${CurrentYYYY}/${schoolYYYY}`).doc(courseid);
    let courseinfo: Course;

    await courseRef.get().toPromise().then((doc) => { courseinfo = doc.data() as Course; });
    if (!courseinfo) { return 'Curso no encontrado'; }
    console.log(courseinfo);
    // const teacherRef = this.afs.collection(`users/`).doc();
    for (const teacher of courseinfo.teacher) {
      await this.deleteTeacherFromCourse(this.afs.doc(`users/${teacher}`).ref, courseid, CurrentYYYY, schoolYYYY);
    }
    for (const student of courseinfo.students) {
      await this.deleteStudentFromCourse(this.afs.doc(`users/${student}`).ref, courseid, CurrentYYYY, schoolYYYY);
    }
    await courseRef.delete().then((res) => { console.log('Eliminado '); });
    return 'eliminado';
  }

  async assingTeacher(teacherid: string, courseid: string, CurrentYYYY: number, schoolYYYY: number) {

    const courseRef = this.afs.collection(`courses/${CurrentYYYY}/${schoolYYYY}`).doc(courseid);
    const teacherRef = this.afs.collection(`users/`).doc(teacherid);
    let cursomod: Course;
    let teacherInfo: User;
    // get current professors from the course
    await courseRef.get().toPromise().then(doc => {
      if (doc.exists) {
        console.log('Document data:', doc.data());
        cursomod = doc.data() as Course;
        cursomod.teacher.push(this.afs.doc(`users/${teacherid}`).ref);
      } else {
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
    // adding professor to the course
    await courseRef.set(cursomod);
    // get current professor courses
    await teacherRef.get().toPromise().then(doc => {
      if (doc.exists) {
        teacherInfo = doc.data() as User;
        console.log(teacherInfo.courses === undefined);
        if (teacherInfo.courses === undefined) {
          teacherInfo.courses = [];
        }
        teacherInfo.courses.push(courseRef.ref);
      } else {
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
    // adding course to the professor
    await teacherRef.set(teacherInfo);
  }

  async assingStudent(studentid: string, courseid: string, CurrentYYYY: number, schoolYYYY: number) {

    const courseRef = this.afs.collection(`courses/${CurrentYYYY}/${schoolYYYY}`).doc(courseid);
    const studentRef = this.afs.collection(`users/`).doc(studentid);
    let cursomod: Course;
    let studentInfo: User;
    // get current info from the course
    await courseRef.get().toPromise().then(doc => {
      if (doc.exists) {
        console.log('Document data:', doc.data());
        cursomod = doc.data() as Course;
        cursomod.students.push(studentRef.ref);
      } else {
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
    // adding professor to the course
    await courseRef.set(cursomod);
    // get current professor courses
    await studentRef.get().toPromise().then(doc => {
      if (doc.exists) {
        studentInfo = doc.data() as User;
        studentInfo.Course = courseRef.ref;
      } else {
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
    // adding course to the professor
    await studentRef.set(studentInfo);
  }

  async deleteTeacherFromCourse(teacherid: DocumentReference, courseid: string, CurrentYYYY: number, schoolYYYY: number) {
    const courseRef = this.afs.collection(`courses/${CurrentYYYY}/${schoolYYYY}`).doc(courseid);
    let cursomod: Course;
    let teacherInfo: User;
    await courseRef.get().toPromise().then(doc => {
      if (doc.exists) {
        console.log('Document data:', doc.data());
        cursomod = doc.data() as Course;
        // tslint:disable-next-line: triple-equals
        cursomod.teacher = cursomod.teacher.filter((uid) => uid != teacherid);
      } else {
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });

    // deleting professor from the course
    await courseRef.set(cursomod);

    // get current professor courses
    await teacherid.get().then(doc => {
      if (doc.exists) {
        teacherInfo = doc.data() as User;
        console.log(teacherInfo.courses === undefined);
        if (teacherInfo.courses === undefined) {
          teacherInfo.courses = [];
        }
        // tslint:disable-next-line: triple-equals
        teacherInfo.courses = teacherInfo.courses.filter((cid) => cid != courseRef.ref);
      } else {
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
    // deleting course from the professor
    await teacherid.set(teacherInfo);
  }

  async deleteStudentFromCourse(studentid: DocumentReference, courseid: string, CurrentYYYY: number, schoolYYYY: number) {
    const courseRef = this.afs.collection(`courses/${CurrentYYYY}/${schoolYYYY}`).doc(courseid);
    let cursomod: Course;
    let studentInfo: User;
    await courseRef.get().toPromise().then(doc => {
      if (doc.exists) {
        console.log('Document data:', doc.data());
        cursomod = doc.data() as Course;
        cursomod.students = cursomod.students.filter((uid) => uid !== studentid);
      } else {
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });

    // deleting student from the course
    await courseRef.set(cursomod);

    // get student course
    await studentid.get().then(doc => {
      if (doc.exists) {
        studentInfo = doc.data() as User;
        delete studentInfo.Course;
      } else {
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
    // deleting course from the student
    await studentid.set(studentInfo);
  }

}
