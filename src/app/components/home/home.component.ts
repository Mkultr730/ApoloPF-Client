import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LessonsService } from 'src/app/services/lessons/lessons.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lessons: Observable<any>;

  constructor(private lessonsService: LessonsService) { }

  ngOnInit(): void {
    this.lessons = this.lessonsService.getAll();
  }
}
