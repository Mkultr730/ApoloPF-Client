import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  form: FormGroup;

  public timeBegan = null;
  public timeStopped: any = null;
  public stoppedDuration: any = 0;
  public started = null;
  public running = false;

  public blankTime = '00:00';
  public time = '00:00';

  get currentQuestion(): number { return (this.form.get('currentQuestion') as FormControl).value; }
  set currentQuestion(value: number) { (this.form.get('currentQuestion') as FormControl).setValue(value); }

  constructor(
    private contentService: ContentService,
    private location: Location,
    private lessonService: LessonsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private firebase: AngularFirestore) { }

  ngOnInit(): void {
    this.idSub = this.route.params.subscribe(params => this.lessonId = params.id);
    this.getEnunciados();
    this.lesson = this.lessonService.get(this.lessonId);
    this.form = this.formBuilder.group({ currentQuestion: 0 });
    this.start();
  }

  getEnunciados() {
    this.secciones = this.contentService.get(this.lessonId);
  }

  backButton() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  nextQuestion(): void {
    this.currentQuestion++;
    this.scrollToTop();
  }

  scrollToTop() {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 4));
      }
    })();
  }

  start() {
    if (this.running) { return; }
    if (this.timeBegan === null) {
      this.reset();
      this.timeBegan = new Date();
    }
    if (this.timeStopped !== null) {
      const newStoppedDuration: any = (+new Date() - this.timeStopped);
      this.stoppedDuration = this.stoppedDuration + newStoppedDuration;
    }
    this.started = setInterval(this.clockRunning.bind(this), 10);
    this.running = true;
  }

  stop() {
    this.running = false;
    this.timeStopped = new Date();
    clearInterval(this.started);
  }

  reset() {
    this.running = false;
    clearInterval(this.started);
    this.stoppedDuration = 0;
    this.timeBegan = null;
    this.timeStopped = null;
    this.time = this.blankTime;
  }

  zeroPrefix(num, digit) {
    let zero = '';
    for (let i = 0; i < digit; i++) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  }

  clockRunning() {
    const currentTime: any = new Date();
    const timeElapsed: any = new Date(currentTime - this.timeBegan - this.stoppedDuration);
    const hour = timeElapsed.getUTCHours();
    const min = timeElapsed.getUTCMinutes();
    const sec = timeElapsed.getUTCSeconds();
    this.time = hour > 0 ? this.zeroPrefix(hour, 2) + ':' : '' + this.zeroPrefix(min, 2) + ':' + this.zeroPrefix(sec, 2);
  }

  ngOnDestroy() {
    this.idSub.unsubscribe();
  }

}
