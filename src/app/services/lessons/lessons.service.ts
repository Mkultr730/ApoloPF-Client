import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  constructor(private firestore: AngularFirestore) { }

  getAll() {
    return this.firestore.collection('lecciones').valueChanges();
  }
}
