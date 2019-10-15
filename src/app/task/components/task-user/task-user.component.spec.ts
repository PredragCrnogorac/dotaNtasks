import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskUserComponent } from './task-user.component';

describe('TaskUserComponent', () => {
  let component: TaskUserComponent;
  let fixture: ComponentFixture<TaskUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
