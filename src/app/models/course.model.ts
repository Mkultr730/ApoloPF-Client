import { User } from './user.model';

export interface Course{
    uid:string,
    coursename:string,
    teacher:User[],
    students:User[]
}