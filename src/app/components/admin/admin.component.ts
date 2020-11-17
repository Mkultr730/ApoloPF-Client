import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  courses: Observable<Array<Course>>;

  constructor(private firestore: AngularFirestore, private courseService: CourseService) { }

  ngOnInit(): void {
    const year = new Date().getFullYear();
    console.log(year);
    this.courses = this.courseService.listCourses(year);
    this.courses.subscribe(courses => {
      console.log(courses);
    });
  }

}
