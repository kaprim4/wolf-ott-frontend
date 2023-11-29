import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherHeaderListComponent } from './voucher-header-list.component';

describe('VoucherHeaderListComponent', () => {
  let component: VoucherHeaderListComponent;
  let fixture: ComponentFixture<VoucherHeaderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherHeaderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherHeaderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
