import { DocumentReference } from '@angular/fire/firestore';

export interface User{
    uid: string;
    email: string;
    photoURL?: string;
    role?: string;
    authType: number;
    courses?: Array<DocumentReference>;
    course?: string;
    displayName?: string;
}
