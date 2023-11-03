import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/auth.models';
import { AuthenticationService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-landing-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  mobileMenuOpen: boolean = false;
  loggedInUser: User | null = null;

  constructor (
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) { }


  ngOnInit(): void {

    this.loggedInUser = this.authService.currentUser();

    window.addEventListener('scroll', (e) => {
      e.preventDefault();
      const navbar = document.getElementById("nav-sticky");
      if (navbar) {
        if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
          navbar.classList.add("nav-sticky");
        } else {
          navbar.classList.remove("nav-sticky");
        }
      }

    });
  }

  /**
   * check if section is active or not
   * @param section section name
   */
  isSectionActive(section: string): boolean {
    let element = false;
    this.route.fragment.subscribe(
      (fragment) => {
        element = fragment === section.split("#").pop();
      });
    return element;
  }

  /**
   * toggle mobile menu
   */
  toggleMenu(event: any): void {
    event.preventDefault();
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

}
