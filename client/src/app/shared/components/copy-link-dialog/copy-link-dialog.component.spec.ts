import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyLinkDialogComponent } from './copy-link-dialog.component';

describe('CopyLinkDialogComponent', () => {
  let component: CopyLinkDialogComponent;
  let fixture: ComponentFixture<CopyLinkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyLinkDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopyLinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
