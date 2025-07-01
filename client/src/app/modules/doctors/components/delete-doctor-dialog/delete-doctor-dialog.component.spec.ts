import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDoctorDialogComponent } from './delete-doctor-dialog.component';

describe('DeleteDoctorDialogComponent', () => {
  let component: DeleteDoctorDialogComponent;
  let fixture: ComponentFixture<DeleteDoctorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDoctorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDoctorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
