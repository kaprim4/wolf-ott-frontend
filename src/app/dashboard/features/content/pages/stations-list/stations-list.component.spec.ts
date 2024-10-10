import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationsListComponent } from './stations-list.component';

describe('StationsListComponent', () => {
  let component: StationsListComponent;
  let fixture: ComponentFixture<StationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
