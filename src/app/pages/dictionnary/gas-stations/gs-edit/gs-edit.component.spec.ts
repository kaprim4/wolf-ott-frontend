import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsEditComponent } from './gs-edit.component';

describe('GsEditComponent', () => {
  let component: GsEditComponent;
  let fixture: ComponentFixture<GsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
