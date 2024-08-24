import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemHostBindingComponent } from './list-item-host-binding.component';

describe('ListItemHostBindingComponent', () => {
  let component: ListItemHostBindingComponent;
  let fixture: ComponentFixture<ListItemHostBindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItemHostBindingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListItemHostBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
