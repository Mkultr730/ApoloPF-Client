import { Pipe, PipeTransform } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { Course } from 'src/app/models/course.model';

@Pipe({
  name: 'students'
})
export class StudentsPipe implements PipeTransform {

  transform(value: DocumentReference): Promise<Array<DocumentReference>> {
    return value?.get().then(classSnap => {
      return (classSnap.data() as Course).students;
    });
  }


}



