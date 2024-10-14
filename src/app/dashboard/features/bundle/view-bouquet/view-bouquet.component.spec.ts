import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBouquetComponent } from './view-bouquet.component';

describe('ViewBouquetComponent', () => {
  let component: ViewBouquetComponent;
  let fixture: ComponentFixture<ViewBouquetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBouquetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBouquetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
