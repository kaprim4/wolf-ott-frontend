import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthModernLayout } from './modern.layout';

describe('AuthModernLayout', () => {
  let component: AuthModernLayout;
  let fixture: ComponentFixture<AuthModernLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthModernLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthModernLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
