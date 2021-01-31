import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddHospitalComponent } from './admin-add-hospital.component';

describe('AdminAddHospitalComponent', () => {
  let component: AdminAddHospitalComponent;
  let fixture: ComponentFixture<AdminAddHospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddHospitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
