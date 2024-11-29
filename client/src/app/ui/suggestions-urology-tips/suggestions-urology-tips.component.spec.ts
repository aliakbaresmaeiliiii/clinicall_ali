import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsUrologyTipsComponent } from './suggestions-urology-tips.component';

describe('SuggestionsUrologyTipsComponent', () => {
  let component: SuggestionsUrologyTipsComponent;
  let fixture: ComponentFixture<SuggestionsUrologyTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionsUrologyTipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionsUrologyTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
