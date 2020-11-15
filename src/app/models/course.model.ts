import { User } from './user.model';

export interface Course {
  coursename: string;
  grado: number;
  teacher: Array<string>;
  students: Array<string>;
}
