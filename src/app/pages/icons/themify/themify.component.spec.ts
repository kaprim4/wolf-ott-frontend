import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemifyComponent } from './themify.component';

describe('ThemifyComponent', () => {
  let component: ThemifyComponent;
  let fixture: ComponentFixture<ThemifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
