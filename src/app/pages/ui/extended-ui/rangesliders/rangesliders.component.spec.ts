import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeslidersComponent } from './rangesliders.component';

describe('RangeslidersComponent', () => {
  let component: RangeslidersComponent;
  let fixture: ComponentFixture<RangeslidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangeslidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeslidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
