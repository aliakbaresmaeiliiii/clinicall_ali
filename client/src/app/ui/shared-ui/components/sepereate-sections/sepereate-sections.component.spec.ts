import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SepereateSectionsComponent } from './sepereate-sections.component';

describe('SepereateSectionsComponent', () => {
  let component: SepereateSectionsComponent;
  let fixture: ComponentFixture<SepereateSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SepereateSectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SepereateSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
