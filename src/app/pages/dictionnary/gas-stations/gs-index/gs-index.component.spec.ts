import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsIndexComponent } from './gs-index.component';

describe('GsIndexComponent', () => {
  let component: GsIndexComponent;
  let fixture: ComponentFixture<GsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GsIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
