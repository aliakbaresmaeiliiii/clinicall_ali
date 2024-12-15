import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDoctorApointmentComponent } from './get-doctor-apointment.component';

describe('GetDoctorApointmentComponent', () => {
  let component: GetDoctorApointmentComponent;
  let fixture: ComponentFixture<GetDoctorApointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetDoctorApointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetDoctorApointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
