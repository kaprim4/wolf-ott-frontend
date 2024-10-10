import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnigmaDevicesListComponent } from './enigma-devices-list.component';

describe('EnigmaDevicesListComponent', () => {
  let component: EnigmaDevicesListComponent;
  let fixture: ComponentFixture<EnigmaDevicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnigmaDevicesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnigmaDevicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
