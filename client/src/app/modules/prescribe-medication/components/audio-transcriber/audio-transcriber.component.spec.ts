import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioTranscriberComponent } from './audio-transcriber.component';

describe('AudioTranscriberComponent', () => {
  let component: AudioTranscriberComponent;
  let fixture: ComponentFixture<AudioTranscriberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioTranscriberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AudioTranscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
