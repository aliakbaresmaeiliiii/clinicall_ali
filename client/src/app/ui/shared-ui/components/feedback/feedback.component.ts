import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewsDTO } from '../../../../modules/doctors/models/doctors';
import { ToastrService } from 'ngx-toastr';
import { DoctorsService } from '../../../../modules/doctors/services/doctors.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-feedback',
  standalone: false,
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss',
})
export class FeedbackComponent implements OnInit {
  // readonly data = inject<DoctorScheduleAvailability>(MAT_DIALOG_DATA);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  doctorInfo :any;
  userData: any;
  doctorService = inject(DoctorsService);
  feedbackForm!: FormGroup;
  fb = inject(FormBuilder);
  toast = inject(ToastrService);
  urlIcon = {
    empty: '../../../../../assets/images/ui/svg/star-empty.svg',
    half: '../../../../../assets/images/ui/svg/star-half.svg',
    full: '../../../../../assets/images/ui/svg/star-full.svg',
  };

  ngOnInit(): void {
    this.doctorInfo = this.doctorService.storeDoctorInfo();
    const getUserData = localStorage.getItem('userData');
    if (getUserData) {
      this.userData = JSON.parse(getUserData);
    }
    this.initializeForm();
  }

  private initializeForm(): void {
    this.feedbackForm = this.fb.group({
      rating: [null, Validators.required],
      recommendations: [false, Validators.required],
      comment: [''],
      ratings: this.fb.group({
        professional_demeanor: [null, Validators.required],
        sufficient_time: [null, Validators.required],
        skill: [null, Validators.required],
        staff_behavior: [null, Validators.required],
        clinic_condition: [null, Validators.required],
      }),
    });
  }
  onRatingSetAppointment(rating: number): void {
    this.feedbackForm.patchValue({ rating: rating });
  }

  recommended(value: boolean): void {
    this.feedbackForm.patchValue({ recommendations: value });
  }

  doNotRecommended(value: boolean): void {
    this.feedbackForm.patchValue({ recommendations: value });
  }

  onRatingSetPatient(rating: number): void {
    this.feedbackForm.get('ratings.professional_demeanor')?.setValue(rating);
  }

  onRatingSetAllocating(rating: number): void {
    this.feedbackForm.get('ratings.sufficient_time')?.setValue(rating);
  }

  onRatingSetSkill(rating: number): void {
    this.feedbackForm.get('ratings.skill')?.setValue(rating);
  }

  onRatingSetProcess(rating: number): void {
    this.feedbackForm.get('ratings.staff_behavior')?.setValue(rating);
  }

  onRatingSetCondition(rating: number): void {
    this.feedbackForm.get('ratings.clinic_condition')?.setValue(rating);
  }

  comment(comment: string): void {
    this.feedbackForm.get('comment')?.setValue(comment);
  }

  submitFeedback(): void {
    if (this.feedbackForm.value) {
      const valueForm = this.feedbackForm.value;
      
      const payload: ReviewsDTO = {
        ...valueForm,
        doctor_id: this.doctorInfo[0].id,
        user_id: this.userData.id,
      };
      this.doctorService.insertReviews(payload).subscribe(
        res => {
          if (res) {
            this.toast.success(
              'Thank you for your feedback! It has been successfully submitted.'
            );
          }
        }
        // error => {
        //   this.toast.error(error);
        // }
      );
    }
  }
}
