import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLinesListComponent } from './user-lines-list.component';

describe('UserLinesListComponent', () => {
  let component: UserLinesListComponent;
  let fixture: ComponentFixture<UserLinesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLinesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
