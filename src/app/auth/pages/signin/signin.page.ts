import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'auth-signin-page',
  templateUrl: './signin.page.html',
  styleUrl: './signin.page.scss',
})
export class SigninPage {
  options = this.settings.getOptions();
  constructor(private settings: CoreService) {}
}
