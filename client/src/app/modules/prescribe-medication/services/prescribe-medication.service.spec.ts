import { TestBed } from '@angular/core/testing';

import { PrescribeMedicationService } from './prescribe-medication.service';

describe('PrescribeMedicationService', () => {
  let service: PrescribeMedicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrescribeMedicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
