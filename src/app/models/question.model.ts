import { Answer } from './answer.model';

export interface Question {
  id: string;
  madeby: string;
  text: string;
  answers: Array<Answer>;
}
