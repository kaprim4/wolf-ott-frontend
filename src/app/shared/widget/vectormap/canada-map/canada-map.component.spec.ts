import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanadaMapComponent } from './canada-map.component';

describe('CanadaMapComponent', () => {
  let component: CanadaMapComponent;
  let fixture: ComponentFixture<CanadaMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanadaMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanadaMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
