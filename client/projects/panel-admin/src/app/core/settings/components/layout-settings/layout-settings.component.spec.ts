import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSettingsComponent } from './layout-settings.component';

describe('LayoutSettingsComponent', () => {
  let component: LayoutSettingsComponent;
  let fixture: ComponentFixture<LayoutSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
