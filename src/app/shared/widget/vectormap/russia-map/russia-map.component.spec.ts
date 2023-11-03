import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RussiaMapComponent } from './russia-map.component';

describe('RussiaMapComponent', () => {
  let component: RussiaMapComponent;
  let fixture: ComponentFixture<RussiaMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RussiaMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RussiaMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
