import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ejercicio } from '../interfaces/leccion';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private firestore: AngularFirestore) { }

  get(lessonID: string) {
    return this.firestore.collection<Ejercicio>('contenidos', ref => ref.where('leccion', '==', lessonID)).valueChanges({ idField: 'id' });
  }
}
