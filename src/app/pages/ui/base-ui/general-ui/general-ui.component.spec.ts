import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralUiComponent } from './general-ui.component';

describe('GeneralUiComponent', () => {
  let component: GeneralUiComponent;
  let fixture: ComponentFixture<GeneralUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
