import { Leccion } from './../../models/leccion';
import { Pipe, PipeTransform } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';

@Pipe({
  name: 'lessonObject'
})
export class LessonObjectPipe implements PipeTransform {

  transform(value: DocumentReference): Promise<string> {
    return value?.get().then(userSnap => {
      return (userSnap.data() as Leccion).titulo;
    });
  }

}
