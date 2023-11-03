import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsWidget1Component } from './statistics-widget1.component';

describe('StatisticsWidget1Component', () => {
  let component: StatisticsWidget1Component;
  let fixture: ComponentFixture<StatisticsWidget1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsWidget1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsWidget1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
