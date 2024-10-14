import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPackageComponent } from './view-package.component';

describe('ViewPackageComponent', () => {
  let component: ViewPackageComponent;
  let fixture: ComponentFixture<ViewPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPackageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
