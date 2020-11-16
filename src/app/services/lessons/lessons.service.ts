import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Leccion } from 'src/app/models/leccion';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  currentLesson: Leccion;

  constructor(private firestore: AngularFirestore) { }

  getAll(): Observable<Array<Leccion>> {
    return this.firestore.collection<Leccion>('lecciones').valueChanges({ idField: 'id' });
  }

  get(lessonId: string): Observable<Leccion> {
    return this.firestore.collection('lecciones').doc<Leccion>(lessonId).valueChanges();
  }
}
