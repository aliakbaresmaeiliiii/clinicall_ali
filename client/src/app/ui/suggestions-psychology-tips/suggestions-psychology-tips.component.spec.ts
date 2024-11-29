import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsPsychologyTipsComponent } from './suggestions-psychology-tips.component';

describe('SuggestionsPsychologyTipsComponent', () => {
  let component: SuggestionsPsychologyTipsComponent;
  let fixture: ComponentFixture<SuggestionsPsychologyTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionsPsychologyTipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionsPsychologyTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
