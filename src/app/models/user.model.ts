import { DocumentReference } from '@angular/fire/firestore';
import { LessonAttempt } from './attempts';

export interface User{
    uid: string;
    email: string;
    photoURL?: string;
    role?: string;
    authType: number;
    courses?: Array<DocumentReference>;
    Course?: DocumentReference;
    displayName?: string;
    lessons?: Array<LessonAttempt>;
}
