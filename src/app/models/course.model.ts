import { DocumentReference } from '@angular/fire/firestore';

export interface Course {
  coursename: string;
  teacher: Array<DocumentReference>;
  students: Array<DocumentReference>;
}
