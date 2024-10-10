import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvGuidesListComponent } from './tv-guides-list.component';

describe('TvGuidesListComponent', () => {
  let component: TvGuidesListComponent;
  let fixture: ComponentFixture<TvGuidesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvGuidesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvGuidesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
