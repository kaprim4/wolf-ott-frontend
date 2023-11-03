import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsWidget2Component } from './statistics-widget2.component';

describe('StatisticsWidget2Component', () => {
  let component: StatisticsWidget2Component;
  let fixture: ComponentFixture<StatisticsWidget2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsWidget2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsWidget2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
