import { Component, Input, OnInit } from '@angular/core';

// types
import { FAQItem } from './faq.model';

@Component({
  selector: 'app-widget-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  @Input() faqs: FAQItem[] = [];
  @Input() containerClass?: string;

  constructor () { }

  ngOnInit(): void {
  }

}
