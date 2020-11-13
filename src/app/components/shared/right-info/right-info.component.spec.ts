import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RightInfoComponent } from './right-info.component';

describe('RightInfoComponent', () => {
  let component: RightInfoComponent;
  let fixture: ComponentFixture<RightInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RightInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
