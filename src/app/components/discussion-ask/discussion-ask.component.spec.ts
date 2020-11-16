import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionAskComponent } from './discussion-ask.component';

describe('DiscussionAskComponent', () => {
  let component: DiscussionAskComponent;
  let fixture: ComponentFixture<DiscussionAskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscussionAskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionAskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
