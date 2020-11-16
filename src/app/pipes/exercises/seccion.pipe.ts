import { Pipe, PipeTransform } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { Ejercicio } from 'src/app/models/leccion';

@Pipe({
  name: 'seccion'
})
export class SeccionPipe implements PipeTransform {

  transform(value: DocumentReference, ...args: unknown[]): Promise<Ejercicio> {
    return value.get().then(userSnap => {
      return userSnap.data() as Ejercicio;
    });
  }

}
