import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VtAddComponent } from './vt-add.component';

describe('VtAddComponent', () => {
  let component: VtAddComponent;
  let fixture: ComponentFixture<VtAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VtAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VtAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
