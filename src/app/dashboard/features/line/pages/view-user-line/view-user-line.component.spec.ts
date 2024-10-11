import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserLineComponent } from './view-user-line.component';

describe('ViewUserLineComponent', () => {
  let component: ViewUserLineComponent;
  let fixture: ComponentFixture<ViewUserLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUserLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUserLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
