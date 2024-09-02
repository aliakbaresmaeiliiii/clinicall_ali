import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartSelecOtionComponent } from './smart-select-option.component';

describe('SmartSelecOtionComponent', () => {
  let component: SmartSelecOtionComponent;
  let fixture: ComponentFixture<SmartSelecOtionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartSelecOtionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SmartSelecOtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
