import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperSliderCardComponent } from './swiper-slider-card.component';

describe('SwiperSliderCardComponent', () => {
  let component: SwiperSliderCardComponent;
  let fixture: ComponentFixture<SwiperSliderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwiperSliderCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwiperSliderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
