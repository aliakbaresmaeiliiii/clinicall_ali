import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesSupportComponent } from './cities-support.component';

describe('CitiesSupportComponent', () => {
  let component: CitiesSupportComponent;
  let fixture: ComponentFixture<CitiesSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitiesSupportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitiesSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
