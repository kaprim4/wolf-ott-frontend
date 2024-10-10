import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLogsListComponent } from './activity-logs-list.component';

describe('ActivityLogsListComponent', () => {
  let component: ActivityLogsListComponent;
  let fixture: ComponentFixture<ActivityLogsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityLogsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityLogsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
