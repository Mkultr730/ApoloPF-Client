import { TeacherNamePipe } from './teacher-name.pipe';

describe('TeacherNamePipe', () => {
  it('create an instance', () => {
    const pipe = new TeacherNamePipe();
    expect(pipe).toBeTruthy();
  });
});
