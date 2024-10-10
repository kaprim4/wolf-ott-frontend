import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthClassicLayout } from './classic.layout';

describe('AuthClassicLayout', () => {
  let component: AuthClassicLayout;
  let fixture: ComponentFixture<AuthClassicLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthClassicLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthClassicLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
