import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagDevicesListComponent } from './mag-devices-list.component';

describe('MagDevicesListComponent', () => {
  let component: MagDevicesListComponent;
  let fixture: ComponentFixture<MagDevicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagDevicesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagDevicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
