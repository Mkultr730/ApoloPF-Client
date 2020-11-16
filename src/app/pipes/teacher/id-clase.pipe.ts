import { Pipe, PipeTransform } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';

@Pipe({
  name: 'idClase'
})
export class IdClasePipe implements PipeTransform {

  transform(value: DocumentReference, ...args: unknown[]): string {
    return value.id;
  }

}
