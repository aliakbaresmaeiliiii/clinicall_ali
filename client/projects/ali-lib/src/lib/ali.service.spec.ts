import { TestBed } from '@angular/core/testing';

import { AliService } from './ali.service';

describe('AliService', () => {
  let service: AliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
