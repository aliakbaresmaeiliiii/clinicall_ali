import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestDoctorsComponent } from './best-doctors.component';

describe('BestDoctorsComponent', () => {
  let component: BestDoctorsComponent;
  let fixture: ComponentFixture<BestDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestDoctorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BestDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
