import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReviewsOfClinicAliComponent } from './user-reviews-of-clinic-ali.component';

describe('UserReviewsOfClinicAliComponent', () => {
  let component: UserReviewsOfClinicAliComponent;
  let fixture: ComponentFixture<UserReviewsOfClinicAliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserReviewsOfClinicAliComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserReviewsOfClinicAliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
