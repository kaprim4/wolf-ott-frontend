import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingCardsComponent } from './pricing-cards.component';

describe('PricingCardsComponent', () => {
  let component: PricingCardsComponent;
  let fixture: ComponentFixture<PricingCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricingCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
