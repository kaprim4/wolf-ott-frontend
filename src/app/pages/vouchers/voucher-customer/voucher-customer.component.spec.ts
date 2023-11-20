import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherCustomerComponent } from './voucher-customer.component';

describe('CustomerConsultComponent', () => {
  let component: VoucherCustomerComponent;
  let fixture: ComponentFixture<VoucherCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
