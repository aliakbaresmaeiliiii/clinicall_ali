import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsOphthalmologyTipsComponent } from './suggestions-ophthalmology-tips.component';

describe('SuggestionsOphthalmologyTipsComponent', () => {
  let component: SuggestionsOphthalmologyTipsComponent;
  let fixture: ComponentFixture<SuggestionsOphthalmologyTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionsOphthalmologyTipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionsOphthalmologyTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
