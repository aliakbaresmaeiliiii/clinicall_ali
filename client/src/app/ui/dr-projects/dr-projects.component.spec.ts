import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrProjectsComponent } from './dr-projects.component';

describe('DrProjectsComponent', () => {
  let component: DrProjectsComponent;
  let fixture: ComponentFixture<DrProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrProjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
