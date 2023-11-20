import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherControlComponent } from './voucher-control.component';

describe('VoucherControlComponent', () => {
  let component: VoucherControlComponent;
  let fixture: ComponentFixture<VoucherControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
