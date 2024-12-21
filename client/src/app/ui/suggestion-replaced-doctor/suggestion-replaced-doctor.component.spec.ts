import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionReplacedDoctorComponent } from './suggestion-replaced-doctor.component';

describe('SuggestionReplacedDoctorComponent', () => {
  let component: SuggestionReplacedDoctorComponent;
  let fixture: ComponentFixture<SuggestionReplacedDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionReplacedDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionReplacedDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
