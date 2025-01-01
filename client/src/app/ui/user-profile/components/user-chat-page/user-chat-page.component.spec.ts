import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChatPageComponent } from './user-chat-page.component';

describe('UserChatPageComponent', () => {
  let component: UserChatPageComponent;
  let fixture: ComponentFixture<UserChatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserChatPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserChatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
