import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartersProParamsComponent } from './smarters-pro-params.component';

describe('SmartersProParamsComponent', () => {
  let component: SmartersProParamsComponent;
  let fixture: ComponentFixture<SmartersProParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmartersProParamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartersProParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
