import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLogsListComponent } from './user-logs-list.component';

describe('UserLogsListComponent', () => {
  let component: UserLogsListComponent;
  let fixture: ComponentFixture<UserLogsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLogsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLogsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
