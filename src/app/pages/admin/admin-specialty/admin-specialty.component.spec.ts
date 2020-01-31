import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSpecialtyComponent } from './admin-specialty.component';

describe('AdminSpecialtyComponent', () => {
  let component: AdminSpecialtyComponent;
  let fixture: ComponentFixture<AdminSpecialtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSpecialtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
