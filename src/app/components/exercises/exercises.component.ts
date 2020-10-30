import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit, OnDestroy {

  preguntas: Observable<any>;
  lessonId: string;
  private idSub: Subscription;

  constructor(private contentService: ContentService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idSub = this.route.params.subscribe(params => this.lessonId = params.id);
    this.getEnunciados();
  }

  getEnunciados() {
    this.preguntas = this.contentService.get(this.lessonId);
  }

  backButton() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  ngOnDestroy() {
    this.idSub.unsubscribe();
  }

}
