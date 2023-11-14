import { ComponentFixture, TestBed } from '@angular/core/testing';
import {RgIndexComponent} from "./rg-index.component";



describe('UIndexComponent', () => {
  let component: RgIndexComponent;
  let fixture: ComponentFixture<RgIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RgIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RgIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
