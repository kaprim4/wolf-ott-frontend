import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveConnectionsListComponent } from './live-connections-list.component';

describe('LiveConnectionsListComponent', () => {
  let component: LiveConnectionsListComponent;
  let fixture: ComponentFixture<LiveConnectionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveConnectionsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveConnectionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
