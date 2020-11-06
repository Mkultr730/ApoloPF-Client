import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Ejercicio, Leccion } from 'src/app/interfaces/leccion';
import { ContentService } from 'src/app/services/content.service';
import { LessonsService } from 'src/app/services/lessons/lessons.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit, OnDestroy {

  secciones: Observable<Array<Ejercicio>>;
  lessonId: string;
  lesson: Observable<Leccion>;
  private idSub: Subscription;

  constructor(
    private contentService: ContentService,
    private location: Location,
    private lessonService: LessonsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idSub = this.route.params.subscribe(params => this.lessonId = params.id);
    this.getEnunciados();
    this.lesson = this.lessonService.get(this.lessonId);
  }

  getEnunciados() {
    this.secciones = this.contentService.get(this.lessonId);
  }

  backButton() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  ngOnDestroy() {
    this.idSub.unsubscribe();
  }

}
