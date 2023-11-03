import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IraqMapComponent } from './iraq-map.component';

describe('IraqMapComponent', () => {
  let component: IraqMapComponent;
  let fixture: ComponentFixture<IraqMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IraqMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IraqMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
