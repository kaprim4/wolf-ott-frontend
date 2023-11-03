import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

  activeId: string = 'customize';

  constructor () { }

  ngOnInit(): void {
  }

}
