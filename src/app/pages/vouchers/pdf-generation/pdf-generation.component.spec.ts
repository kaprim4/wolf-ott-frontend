import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfGenerationComponent } from './pdf-generation.component';

describe('PdfGenerationComponent', () => {
  let component: PdfGenerationComponent;
  let fixture: ComponentFixture<PdfGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfGenerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
