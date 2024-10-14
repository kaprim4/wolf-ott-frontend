import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouquetsListComponent } from './bouquets-list.component';

describe('BouquetsListComponent', () => {
  let component: BouquetsListComponent;
  let fixture: ComponentFixture<BouquetsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BouquetsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BouquetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
