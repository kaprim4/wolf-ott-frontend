import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrabVouchersComponent } from './grab-vouchers.component';

describe('GrabVouchersComponent', () => {
  let component: GrabVouchersComponent;
  let fixture: ComponentFixture<GrabVouchersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrabVouchersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrabVouchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
