import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDrProjectComponent } from './detail-dr-project.component';

describe('DetailDrProjectComponent', () => {
  let component: DetailDrProjectComponent;
  let fixture: ComponentFixture<DetailDrProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailDrProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailDrProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
