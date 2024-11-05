import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickXtreamComponent } from './quick-xtream.component';

describe('QuickM3uComponent', () => {
  let component: QuickXtreamComponent;
  let fixture: ComponentFixture<QuickXtreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickXtreamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickXtreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
