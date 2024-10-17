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
                  <img src="./assets/images/wolf_text_logo.png" class="align-middle m-2" alt="logo" height="65"/>
              </a>
          }
          @if (options.theme === 'dark') {
              <a href="/">
                  <img src="./assets/images/wolf_text_logo.png" class="align-middle m-2" alt="logo" height="65"/>
              </a>
          }
      </div>
  `,
})
export class BrandingComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService) { }
}
