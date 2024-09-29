import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetCreateComponent } from './preset-create.component';

describe('PresetCreateComponent', () => {
  let component: PresetCreateComponent;
  let fixture: ComponentFixture<PresetCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresetCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
