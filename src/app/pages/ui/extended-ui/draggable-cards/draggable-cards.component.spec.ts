import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableCardsComponent } from './draggable-cards.component';

describe('DraggableCardsComponent', () => {
  let component: DraggableCardsComponent;
  let fixture: ComponentFixture<DraggableCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraggableCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraggableCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
