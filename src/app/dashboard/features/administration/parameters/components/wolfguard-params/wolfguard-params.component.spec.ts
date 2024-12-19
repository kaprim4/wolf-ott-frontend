import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WolfguardParamsComponent } from './wolfguard-params.component';

describe('WolfguardParamsComponent', () => {
  let component: WolfguardParamsComponent;
  let fixture: ComponentFixture<WolfguardParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WolfguardParamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WolfguardParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
