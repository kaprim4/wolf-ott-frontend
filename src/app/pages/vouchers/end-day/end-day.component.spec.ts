import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndDayComponent } from './end-day.component';

describe('EndDayComponent', () => {
  let component: EndDayComponent;
  let fixture: ComponentFixture<EndDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
