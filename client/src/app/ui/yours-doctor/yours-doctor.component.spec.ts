import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoursDoctorComponent } from './yours-doctor.component';

describe('YoursDoctorComponent', () => {
  let component: YoursDoctorComponent;
  let fixture: ComponentFixture<YoursDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YoursDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YoursDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
