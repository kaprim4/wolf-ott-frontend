import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VtIndexComponent } from './vt-index.component';

describe('VtIndexComponent', () => {
  let component: VtIndexComponent;
  let fixture: ComponentFixture<VtIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VtIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VtIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
