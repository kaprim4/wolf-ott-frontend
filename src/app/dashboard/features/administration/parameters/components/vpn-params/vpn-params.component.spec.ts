import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpnParamsComponent } from './vpn-params.component';

describe('VpnParamsComponent', () => {
  let component: VpnParamsComponent;
  let fixture: ComponentFixture<VpnParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VpnParamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VpnParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
