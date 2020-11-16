import { Pipe, PipeTransform } from '@angular/core';
import { Leccion } from 'src/app/models/leccion';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  transform(lesson: Leccion, ...args: unknown[]): string {
    return lesson?.titulo;
  }

}
