import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { Leccion } from 'src/app/models/leccion';
import { User } from 'src/app/models/user.model';
import { LessonsService } from 'src/app/services/lessons/lessons.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lessons: Observable<Array<Leccion>>;

  constructor(private lessonsService: LessonsService) { }

  ngOnInit(): void {
    this.lessons = this.lessonsService.getAll();
  }
}
