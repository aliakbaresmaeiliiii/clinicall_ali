import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLocationDrComponent } from './dialog-location-dr.component';

describe('DialogLocationDrComponent', () => {
  let component: DialogLocationDrComponent;
  let fixture: ComponentFixture<DialogLocationDrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogLocationDrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogLocationDrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
