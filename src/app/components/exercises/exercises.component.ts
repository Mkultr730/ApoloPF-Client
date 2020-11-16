import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Ejercicio, Leccion } from 'src/app/models/leccion';
import { AuthService } from 'src/app/services/auth.service';
import { LessonsService } from 'src/app/services/lessons/lessons.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  lessonId: string;
  lesson: Observable<Leccion>;
  form: FormGroup;

  public timeBegan = null;
  public timeStopped: any = null;
  public stoppedDuration: any = 0;
  public started = null;
  public running = false;
  public timeElapsed: Date;

  public blankTime = '00:00:00';
  public time = '00:00:00';

  get currentQuestion(): number { return (this.form.get('currentQuestion') as FormControl).value; }
  set currentQuestion(value: number) { (this.form.get('currentQuestion') as FormControl).setValue(value); }
  get sections(): FormArray { return this.form.get('sections') as FormArray; }

  constructor(
    private location: Location,
    private lessonService: LessonsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(params => this.lessonId = params.id);
    this.lesson = this.lessonService.get(this.lessonId);
    const sectionsFormArray = new FormArray([]);
    this.form = this.formBuilder.group({ currentQuestion: 0, sections: sectionsFormArray });
    this.lesson.pipe(take(1)).subscribe((lesson: Leccion) => {
      lesson.ejercicios.forEach((ejercicioRef, i) => {
        ejercicioRef.get().then((sanpshot) => {
          const ejercicioValue = sanpshot.data() as Ejercicio;
          const questionsFormArray = new FormArray([]);
          const sectionForm = this.formBuilder.group({
            order: i,
            enunciado: ejercicioValue.enunciado,
            questions: questionsFormArray
          });
          ejercicioValue.preguntas.forEach((pregunta, m) => {
            questionsFormArray.push(this.formBuilder.group({
              index: m,
              chosen: '',
              pregunta: pregunta.pregunta,
              opciones: [pregunta.respuestas],
              respuesta: pregunta.solucion,
              correct: false
            }));
          });
          sectionsFormArray.push(sectionForm);
        });
      });
    });
    this.start();
  }

  getPreguntas(seccion: FormGroup): FormArray { return seccion.get('questions') as FormArray; }

  backButton() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  nextQuestion(): void {
    if (this.currentQuestion + 1 < this.sections.controls.length) {
      this.currentQuestion++;
      this.scrollToTop();
    } else {
      this.sendQuiz();
    }
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
    this.timeElapsed = new Date(currentTime - this.timeBegan - this.stoppedDuration);
    const hour = this.timeElapsed.getUTCHours();
    const min = this.timeElapsed.getUTCMinutes();
    const sec = this.timeElapsed.getUTCSeconds();
    this.time = hour > 0 ? this.zeroPrefix(hour, 2) + ':' : '' + this.zeroPrefix(min, 2) + ':' + this.zeroPrefix(sec, 2);
  }

  sendQuiz(): void {
    this.stop();
    const time = this.timeElapsed.getTime() / 1000;
    const formValue = this.form.getRawValue();
    this.authService.user$.pipe(take(1)).subscribe(user => {
      let lessons = user.lessons;
      let currentLesson = lessons?.find(lesson => lesson.id.id === this.lessonId);
      let score = 0;
      let questionCount = 0;
      const sections = formValue.sections.map(section => {
        return {
          questions: section.questions.map(question => {
            questionCount++;
            if (question.chosen === question.respuesta) { score++; }
            return {
              chosen: question.chosen,
              correct: question.chosen === question.respuesta,
            };
          })
        };
      });
      const attempt = { time, sections, score: score / questionCount };
      if (currentLesson) {
        currentLesson.attempts.push(attempt);
      } else {
        currentLesson = {
          id: this.firestore.doc(`/lessons/${this.lessonId}`).ref,
          attempts: [attempt]
        };
        if (lessons) {
          lessons.push(currentLesson);
        } else {
          lessons = [currentLesson];
        }
      }
      this.firestore.doc(`/users/${this.authService.uid}`).update({ lessons });
      this.router.navigate(['/']);
    });
  }

}
