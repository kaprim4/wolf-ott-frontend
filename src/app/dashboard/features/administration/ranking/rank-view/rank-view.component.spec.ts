import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankViewComponent } from './rank-view.component';

describe('RankViewComponent', () => {
  let component: RankViewComponent;
  let fixture: ComponentFixture<RankViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
