import { Component, Input, OnInit } from '@angular/core';
// types
import { Remainder } from './remainder.model';

@Component({
  selector: 'app-widget-remainders',
  templateUrl: './remainders.component.html',
  styleUrls: ['./remainders.component.scss']
})
export class RemaindersComponent implements OnInit {

  @Input() remainders: Remainder[] = [];

  constructor () { }

  ngOnInit(): void {
  }

}
