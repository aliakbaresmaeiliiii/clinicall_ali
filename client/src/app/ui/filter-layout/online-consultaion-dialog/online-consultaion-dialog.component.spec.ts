import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineConsultaionDialogComponent } from './online-consultaion-dialog.component';

describe('OnlineConsultaionDialogComponent', () => {
  let component: OnlineConsultaionDialogComponent;
  let fixture: ComponentFixture<OnlineConsultaionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineConsultaionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineConsultaionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
