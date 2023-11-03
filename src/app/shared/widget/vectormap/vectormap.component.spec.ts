import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectormapComponent } from './vectormap.component';

describe('VectormapComponent', () => {
  let component: VectormapComponent;
  let fixture: ComponentFixture<VectormapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VectormapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VectormapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
