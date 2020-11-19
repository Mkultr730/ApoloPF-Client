import { Pipe, PipeTransform } from '@angular/core';
import { Course } from 'src/app/models/course.model';

@Pipe({
  name: 'sortCourses'
})
export class SortCoursesPipe implements PipeTransform {

  transform(value: Array<Course>, ...args: unknown[]): Array<Course> {
    return value.sort((a, b) => a.coursename.localeCompare(b.coursename));
  }

}
