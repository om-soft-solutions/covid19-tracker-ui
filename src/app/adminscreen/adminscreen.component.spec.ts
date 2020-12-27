import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminscreenComponent } from './adminscreen.component';

describe('AdminscreenComponent', () => {
  let component: AdminscreenComponent;
  let fixture: ComponentFixture<AdminscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
