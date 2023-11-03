import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalLayoutComponent } from './layout.component';

describe('HorizontalLayoutComponent', () => {
  let component: HorizontalLayoutComponent;
  let fixture: ComponentFixture<HorizontalLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HorizontalLayoutComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
