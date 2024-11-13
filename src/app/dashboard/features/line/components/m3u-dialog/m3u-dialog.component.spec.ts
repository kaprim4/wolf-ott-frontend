import { ComponentFixture, TestBed } from '@angular/core/testing';

import { M3uDialogComponent } from './m3u-dialog.component';

describe('M3uDialogComponent', () => {
  let component: M3uDialogComponent;
  let fixture: ComponentFixture<M3uDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [M3uDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(M3uDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
