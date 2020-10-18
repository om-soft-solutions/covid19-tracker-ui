import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewandupdatesComponent } from './newandupdates.component';

describe('NewandupdatesComponent', () => {
  let component: NewandupdatesComponent;
  let fixture: ComponentFixture<NewandupdatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewandupdatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewandupdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
