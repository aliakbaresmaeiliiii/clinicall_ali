import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesDoctorComponent } from './services-doctor.component';

describe('ServicesDoctorComponent', () => {
  let component: ServicesDoctorComponent;
  let fixture: ComponentFixture<ServicesDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesDoctorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
