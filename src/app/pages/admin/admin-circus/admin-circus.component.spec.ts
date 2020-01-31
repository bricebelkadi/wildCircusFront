import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCircusComponent } from './admin-circus.component';

describe('AdminCircusComponent', () => {
  let component: AdminCircusComponent;
  let fixture: ComponentFixture<AdminCircusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCircusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCircusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
