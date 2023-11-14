import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherConsultComponent } from './voucher-consult.component';

describe('VoucherConsultComponent', () => {
  let component: VoucherConsultComponent;
  let fixture: ComponentFixture<VoucherConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherConsultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
