import { Pipe, PipeTransform } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { User } from 'src/app/models/user.model';

@Pipe({
  name: 'idStudent'
})
export class IdStudentPipe implements PipeTransform {

  transform(value: DocumentReference): Promise<string> {
    return value?.get().then(userSnap => {
      return (userSnap.data() as User).uid;
    });
  }


}
