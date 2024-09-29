import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetEditComponent } from './preset-edit.component';

describe('PresetEditComponent', () => {
  let component: PresetEditComponent;
  let fixture: ComponentFixture<PresetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresetEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
