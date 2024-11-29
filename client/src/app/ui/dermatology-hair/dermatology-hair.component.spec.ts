import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DermatologyHairComponent } from './dermatology-hair.component';

describe('DermatologyHairComponent', () => {
  let component: DermatologyHairComponent;
  let fixture: ComponentFixture<DermatologyHairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DermatologyHairComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DermatologyHairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
