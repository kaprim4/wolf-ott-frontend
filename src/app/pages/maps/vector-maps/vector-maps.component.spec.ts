import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorMapsComponent } from './vector-maps.component';

describe('VectorMapsComponent', () => {
  let component: VectorMapsComponent;
  let fixture: ComponentFixture<VectorMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VectorMapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
