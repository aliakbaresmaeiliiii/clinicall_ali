import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsDentalComponent } from './suggestions-dental.component';

describe('SuggestionsDentalComponent', () => {
  let component: SuggestionsDentalComponent;
  let fixture: ComponentFixture<SuggestionsDentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionsDentalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionsDentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
