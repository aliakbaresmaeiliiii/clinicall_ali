import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsSkinHairComponent } from './suggestions-skin-hair.component';

describe('SuggestionsSkinHairComponent', () => {
  let component: SuggestionsSkinHairComponent;
  let fixture: ComponentFixture<SuggestionsSkinHairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionsSkinHairComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionsSkinHairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
