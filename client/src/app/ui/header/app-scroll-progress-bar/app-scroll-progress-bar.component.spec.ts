import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppScrollProgressBarComponent } from './app-scroll-progress-bar.component';

describe('AppScrollProgressBarComponent', () => {
  let component: AppScrollProgressBarComponent;
  let fixture: ComponentFixture<AppScrollProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppScrollProgressBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppScrollProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
