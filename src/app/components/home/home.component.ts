import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from 'src/app/models/course.model';
import { Leccion } from 'src/app/models/leccion';
import { AuthService } from 'src/app/services/auth.service';
import { LessonsService } from 'src/app/services/lessons/lessons.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lessons: Observable<Array<Leccion>>;

  constructor(private lessonsService: LessonsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.lessons = this.lessonsService.getAll();
      // user.Course?.get().then(course => {
      //   const courseData = course.data() as Course;
      //   this.lessons = this.lessonsService.getAll()
      //   .pipe(map(lessons => lessons.filter(lesson => +lesson.year === courseData.grado)));
      // });
    });
  }
}
