import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {

  @Input() display: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
