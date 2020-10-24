import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private firestore: AngularFirestore) { }

  get() {
    console.log("Test")
    return this.firestore.collection("contenidos").snapshotChanges();
  }
}
