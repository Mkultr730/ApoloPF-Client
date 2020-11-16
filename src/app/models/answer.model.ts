import { DocumentReference } from '@angular/fire/firestore';

export interface Answer{
    uid:DocumentReference;
    text:string;
}
