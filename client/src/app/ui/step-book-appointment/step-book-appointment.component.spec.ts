import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepBookAppointmentComponent } from './step-book-appointment.component';

describe('StepBookAppointmentComponent', () => {
  let component: StepBookAppointmentComponent;
  let fixture: ComponentFixture<StepBookAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepBookAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepBookAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
