import { TestBed } from '@angular/core/testing';

import { PatientFavoritesService } from './patient-favorites.service';

describe('PatientFavoritesService', () => {
  let service: PatientFavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientFavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
