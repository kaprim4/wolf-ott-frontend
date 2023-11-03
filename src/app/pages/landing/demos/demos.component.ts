import { Component, Input, OnInit } from '@angular/core';
import { Layout } from '../landing.model';

@Component({
  selector: 'app-landing-demos',
  templateUrl: './demos.component.html',
  styleUrls: ['./demos.component.scss']
})
export class DemosComponent implements OnInit {

  @Input() demos: Layout[] = [];

  constructor () { }

  ngOnInit(): void {
  }

}
