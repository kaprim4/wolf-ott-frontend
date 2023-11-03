import { Component, Input, OnInit } from '@angular/core';

// types
import { Variant } from 'src/app/pages/ui/base-ui/shared/base-ui.model';

@Component({
  selector: 'app-widget-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() name: string = '';
  @Input() email: string = '';
  @Input() avatar: string = '';
  @Input() designation: string = '';
  @Input() variant: Variant = 'dark';

  constructor () { }

  ngOnInit(): void {
  }

}
