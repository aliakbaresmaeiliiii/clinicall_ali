import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AliSelectComponent } from './ali-select.component';

describe('AliSelectComponent', () => {
  let component: AliSelectComponent;
  let fixture: ComponentFixture<AliSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AliSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AliSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
