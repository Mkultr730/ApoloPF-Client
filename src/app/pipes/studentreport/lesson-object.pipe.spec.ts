import { LessonObjectPipe } from './lesson-object.pipe';

describe('LessonObjectPipe', () => {
  it('create an instance', () => {
    const pipe = new LessonObjectPipe();
    expect(pipe).toBeTruthy();
  });
});
