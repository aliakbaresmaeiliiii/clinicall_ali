import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSelectorComponent } from './time-selector.component';

describe('TimeSelectorComponent', () => {
  let component: TimeSelectorComponent;
  let fixture: ComponentFixture<TimeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
