import { TestBed } from '@angular/core/testing';

import {
  COUNTRIES,
  Country as Countries,
  TaxCalculatorService,
} from './tax-calculator.service';

describe('TaxCalculatorService', () => {
  let service: TaxCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: COUNTRIES,
          useValue: { ua: { name: 'Ukrain', vat: 20 } },
        },
      ],
    });
    service = TestBed.inject(TaxCalculatorService);
  });

  it(`should return 0 if isB2B flag is true`, () => {
    const result = service.calculateVAT(100, 'ua', true);
    expect(result).toBe(0);
  });

  it(`should properly calculate VAT for given country`, () => {
    const result = service.calculateVAT(100, 'ua');
    expect(result).toBe(20);
  });

  describe('TaxCalculatorService: Error Handling', () => {
    it(`should throws error if country isn't supported`, () => {
      expect(() => service.calculateVAT(100, 'ru')).toThrowError(
        /isn't supported/
      );
    });
    it(`should throws error if the price is negative number`, () => {
      expect(() => service.calculateVAT(-100, 'ua')).toThrowError(
        /negative number/
      );
    });
  });
});
