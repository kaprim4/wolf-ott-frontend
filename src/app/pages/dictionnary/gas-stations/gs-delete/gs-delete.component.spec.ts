import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsDeleteComponent } from './gs-delete.component';

describe('GsDeleteComponent', () => {
  let component: GsDeleteComponent;
  let fixture: ComponentFixture<GsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GsDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
