import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAdminDetailComponent } from './task-admin-detail.component';

describe('TaskAdminDetailComponent', () => {
  let component: TaskAdminDetailComponent;
  let fixture: ComponentFixture<TaskAdminDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskAdminDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAdminDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
