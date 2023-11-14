import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsAddComponent } from './gs-add.component';

describe('GsAddComponent', () => {
  let component: GsAddComponent;
  let fixture: ComponentFixture<GsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
