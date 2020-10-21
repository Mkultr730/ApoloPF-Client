import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightInfoComponent } from './right-info.component';

describe('RightInfoComponent', () => {
  let component: RightInfoComponent;
  let fixture: ComponentFixture<RightInfoComponent>;

  beforeEach(async(() => {
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
