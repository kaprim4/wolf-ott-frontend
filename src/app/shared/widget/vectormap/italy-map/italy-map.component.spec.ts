import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItalyMapComponent } from './italy-map.component';

describe('ItalyMapComponent', () => {
  let component: ItalyMapComponent;
  let fixture: ComponentFixture<ItalyMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItalyMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItalyMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
