import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggustionsServiceComponent } from './suggustions-service.component';

describe('SuggustionsServiceComponent', () => {
  let component: SuggustionsServiceComponent;
  let fixture: ComponentFixture<SuggustionsServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggustionsServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggustionsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
