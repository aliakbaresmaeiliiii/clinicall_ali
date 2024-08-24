import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieDountChartComponent } from './pie-dount-chart.component';

describe('PieDountChartComponent', () => {
  let component: PieDountChartComponent;
  let fixture: ComponentFixture<PieDountChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieDountChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PieDountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
