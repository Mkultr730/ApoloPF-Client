import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
      this.user.subscribe(user => { console.log(user); });
  }
}
