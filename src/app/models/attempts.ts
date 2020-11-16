import { DocumentReference } from '@angular/fire/firestore';

export interface LessonAttempt {
  id: DocumentReference;
  attempts: Array<Attempt>;
}

export interface Attempt {
  time: number;
  score: number;
  sections: Array<{
    questions: Array<{
      chosen: string;
      correct: boolean;
    }>;
  }>;
}
