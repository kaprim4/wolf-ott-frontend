import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserLineComponent } from './add-user-line.component';

describe('AddUserLineComponent', () => {
  let component: AddUserLineComponent;
  let fixture: ComponentFixture<AddUserLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
