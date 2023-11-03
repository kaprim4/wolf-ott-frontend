import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsWidget3Component } from './statistics-widget3.component';

describe('StatisticsWidget3Component', () => {
  let component: StatisticsWidget3Component;
  let fixture: ComponentFixture<StatisticsWidget3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsWidget3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsWidget3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
