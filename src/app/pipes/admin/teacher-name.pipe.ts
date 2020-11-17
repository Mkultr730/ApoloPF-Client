import { Pipe, PipeTransform } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { Course } from 'src/app/models/course.model';
import { User } from 'src/app/models/user.model';

@Pipe({
  name: 'teacherName'
})
export class TeacherNamePipe implements PipeTransform {

  async transform(value: DocumentReference, ...args: unknown[]): Promise<string> {
    return ((await value?.get()).data() as User).displayName;
  }

}
