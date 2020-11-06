import { Pipe, PipeTransform } from '@angular/core';
import { Leccion } from 'src/app/interfaces/leccion';

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {

  transform(lesson: Leccion, ...args: unknown[]): string {
    return lesson?.icon;
  }

}
