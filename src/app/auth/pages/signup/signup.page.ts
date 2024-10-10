import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'auth-signup-page',
  templateUrl: './signup.page.html',
  styleUrl: './signup.page.scss'
})
export class SignupPage {
  options = this.settings.getOptions();
  constructor(private settings: CoreService) {}
}
