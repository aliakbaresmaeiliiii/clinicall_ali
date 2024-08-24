import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsGroupComponent } from './patients-group.component';

describe('PatientsGroupComponent', () => {
  let component: PatientsGroupComponent;
  let fixture: ComponentFixture<PatientsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
