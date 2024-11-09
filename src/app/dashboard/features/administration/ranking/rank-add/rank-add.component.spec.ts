import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankAddComponent } from './rank-add.component';

describe('RankAddComponent', () => {
  let component: RankAddComponent;
  let fixture: ComponentFixture<RankAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
