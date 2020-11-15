import { DocumentReference } from '@angular/fire/firestore';
import { Answer } from './answer.model';

export interface Question {
  id: string;
  madeby: DocumentReference;
  question: string;
  answers: Array<Answer>;
  details: string;
}
