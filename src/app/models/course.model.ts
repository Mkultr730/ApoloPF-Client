import { DocumentReference } from '@angular/fire/firestore';

export interface Course {
  coursename: string;
  grado: number;
  teacher: Array<DocumentReference>;
  students: Array<DocumentReference>;
}
