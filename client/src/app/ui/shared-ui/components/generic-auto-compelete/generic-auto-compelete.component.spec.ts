import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericAutoCompeleteComponent } from './generic-auto-compelete.component';

describe('GenericAutoCompeleteComponent', () => {
  let component: GenericAutoCompeleteComponent;
  let fixture: ComponentFixture<GenericAutoCompeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericAutoCompeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericAutoCompeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
