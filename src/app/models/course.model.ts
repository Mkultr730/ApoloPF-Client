import { User } from './user.model';

export interface Course {
  coursename: string;
  teacher: Array<string>;
  students: Array<string>;
}
