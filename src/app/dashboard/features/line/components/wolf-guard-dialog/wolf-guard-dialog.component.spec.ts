import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WolfGuardDialogComponent } from './wolf-guard-dialog.component';

describe('WolfGuardDialogComponent', () => {
  let component: WolfGuardDialogComponent;
  let fixture: ComponentFixture<WolfGuardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WolfGuardDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WolfGuardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
