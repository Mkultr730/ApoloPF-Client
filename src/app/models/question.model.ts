import { Answer } from './answer.model';

export interface Question{
    madeby:string;
    text:string;
    answers:Answer[];
}
