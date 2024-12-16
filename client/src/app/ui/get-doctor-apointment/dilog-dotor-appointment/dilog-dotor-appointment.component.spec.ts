import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DilogDotorAppointmentComponent } from './dilog-dotor-appointment.component';

describe('DilogDotorAppointmentComponent', () => {
  let component: DilogDotorAppointmentComponent;
  let fixture: ComponentFixture<DilogDotorAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DilogDotorAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DilogDotorAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
