import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediicAppointmentComponent } from './mediic-appointment.component';

describe('MediicAppointmentComponent', () => {
  let component: MediicAppointmentComponent;
  let fixture: ComponentFixture<MediicAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediicAppointmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediicAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
