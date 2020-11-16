import { Pipe, PipeTransform } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { Course } from 'src/app/models/course.model';

@Pipe({
  name: 'clase'
})
export class ClasePipe implements PipeTransform {

  transform(value: DocumentReference, ...args: unknown[]): Promise<Course> {
    return value.get().then(userSnap => {
      return userSnap.data() as Course;
    });
  }

}
