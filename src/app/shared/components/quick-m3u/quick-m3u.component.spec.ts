import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickM3uComponent } from './quick-m3u.component';

describe('QuickM3uComponent', () => {
  let component: QuickM3uComponent;
  let fixture: ComponentFixture<QuickM3uComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickM3uComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickM3uComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
