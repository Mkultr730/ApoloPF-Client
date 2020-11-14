import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.scss']
})
export class TeacherHomeComponent implements OnInit {
  Cursos: Observable<any>;
  user: Observable<User>;

  constructor(private authservice: AuthService, private courseService: CourseService) { }
  ngOnInit(): void {
      this.user = this.authservice.user$;
      this.courseService.listCourses(2020).then(cursos => {
        console.log(cursos);
        this.Cursos = cursos;
      });

  }

}
