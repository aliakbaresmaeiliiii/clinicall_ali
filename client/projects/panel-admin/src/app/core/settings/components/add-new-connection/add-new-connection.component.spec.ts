import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewConnectionComponent } from './add-new-connection.component';

describe('AddNewConnectionComponent', () => {
  let component: AddNewConnectionComponent;
  let fixture: ComponentFixture<AddNewConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewConnectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
