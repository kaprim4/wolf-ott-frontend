import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

// utility function
import { findAllParent, findMenuItem } from '../../shared/helper/utils';

// types
import { MenuItem } from '../../shared/models/menu.model';

// data
import { HORIZONTAL_MENU_ITEMS } from '../../shared/config/menu-meta';


@Component({
  selector: 'app-horizontal-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  @Input() showMobileMenu: boolean = true;
  menuItems: MenuItem[] = [];
  activeMenuItems: string[] = [];
  chunkSize: number = 7;

  constructor (
    private router: Router
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenu();
      }
    });
  }

  ngOnInit(): void {
    this.initMenu();
  }

  /**
   * On view init - activating menuitems
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this._activateMenu();
    });
  }


  /**
   * Initializing menuitems and controlling how many menu items can be displayed in it
   */
  initMenu(): void {
    this.menuItems = HORIZONTAL_MENU_ITEMS;
  }



  // split array for chumk size
  splitArray(array: any[], chunkSize: number): any[] {
    const splittedArray: any = Array(Math.ceil(array.length / chunkSize))
      .fill(1)
      .map((_, index) => index * chunkSize)
      .map((begin) => array.slice(begin, begin + chunkSize));

    return splittedArray;
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasSubmenu(menu: MenuItem): boolean {
    return menu.children ? true : false;
  }

  /**
 * checks if menuitem has grand children and controls rendering mega menu
 * @param menuItem menu item
 */
  hasGrandChildren(menuItem: MenuItem): boolean {
    let hasGrandChild: MenuItem[] = menuItem.children && menuItem.children.filter((child: MenuItem) => child.children?.length && child.children);
    return hasGrandChild.length > 0;
  }


  /**
   *  Toggle the dropdown menu
   */
  toggleMenuItem(menuItem: MenuItem): void {
    menuItem.collapsed = !menuItem.collapsed;
    let openMenuItems: string[];
    if (!menuItem.collapsed) {
      openMenuItems = ([menuItem['key'], ...findAllParent(this.menuItems, menuItem)]);
      // close other open menu
      this.menuItems.forEach((menu: MenuItem) => {
        if (!openMenuItems.includes(menu.key!)) {
          menu.collapsed = true;
        }
      })
    }

  };


  /**
   * activate the menuitems
   */
  _activateMenu(): void {
    const div = document.getElementById('topnav-menu-content');
    let matchingMenuItem = null;
    if (div) {
      let items: any = div.getElementsByClassName('nav-link-ref');
      for (let i = 0; i < items.length; ++i) {
        if (window.location.pathname === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        const mid = matchingMenuItem.getAttribute('data-menu-key');
        const activeMt = findMenuItem(this.menuItems, mid);
        if (activeMt) {
          this.activeMenuItems = ([activeMt['key'], ...findAllParent(this.menuItems, activeMt)]);
        }

      }
    }

    // close all menu
    this.menuItems.forEach((menu: MenuItem) => {
      menu.collapsed = true;
    })

  }


}
