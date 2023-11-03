import { Component, Input, OnInit } from '@angular/core';
import { Testimonial } from '../landing.model';

@Component({
  selector: 'app-landing-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

  @Input() testimonials: Testimonial[] = [];

  constructor () { }

  ngOnInit(): void {
  }

}
