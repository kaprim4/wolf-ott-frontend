import { Component, Input, OnInit } from '@angular/core';
import { Service } from '../landing.model';

@Component({
  selector: 'app-landing-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  @Input() services: Service[] = [];

  constructor () { }

  ngOnInit(): void {
  }

}
