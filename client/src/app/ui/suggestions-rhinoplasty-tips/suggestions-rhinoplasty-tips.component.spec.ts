import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsRhinoplastyTipsComponent } from './suggestions-rhinoplasty-tips.component';

describe('SuggestionsRhinoplastyTipsComponent', () => {
  let component: SuggestionsRhinoplastyTipsComponent;
  let fixture: ComponentFixture<SuggestionsRhinoplastyTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionsRhinoplastyTipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionsRhinoplastyTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
