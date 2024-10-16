import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterModule],
  template: `
      <div class="branding">
          @if (options.theme === 'light') {
              <a href="/">
                  <img src="./assets/images/wolf_logo.png" class="align-middle" alt="logo" width="75"/>
                  <img src="./assets/images/logo-dark.png" class="align-middle" alt="logo" height="80"/>
              </a>
          }
          @if (options.theme === 'dark') {
              <a href="/">
                  <img src="./assets/images/wolf_logo.png" class="align-middle" alt="logo" width="75"/>
                  <img src="./assets/images/logo-light.png" class="align-middle" alt="logo" height="40"/>
              </a>
          }
      </div>
  `,
})
export class BrandingComponent {

  options = this.settings.getOptions();

  constructor(
      private settings: CoreService
  ) {
  }
}
