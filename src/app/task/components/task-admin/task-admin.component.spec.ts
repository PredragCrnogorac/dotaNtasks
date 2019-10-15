import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAdminComponent } from './task-admin.component';

describe('TaskAdminComponent', () => {
  let component: TaskAdminComponent;
  let fixture: ComponentFixture<TaskAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
