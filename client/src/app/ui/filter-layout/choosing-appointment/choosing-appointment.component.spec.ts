import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosingAppointmentComponent } from './choosing-appointment.component';

describe('ChoosingAppointmentComponent', () => {
  let component: ChoosingAppointmentComponent;
  let fixture: ComponentFixture<ChoosingAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoosingAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoosingAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
