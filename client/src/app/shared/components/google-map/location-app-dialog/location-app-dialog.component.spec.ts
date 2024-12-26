import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAppDialogComponent } from './location-app-dialog.component';

describe('LocationAppDialogComponent', () => {
  let component: LocationAppDialogComponent;
  let fixture: ComponentFixture<LocationAppDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationAppDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationAppDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
