import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VtEditComponent } from './vt-edit.component';

describe('VtEditComponent', () => {
  let component: VtEditComponent;
  let fixture: ComponentFixture<VtEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VtEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VtEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
