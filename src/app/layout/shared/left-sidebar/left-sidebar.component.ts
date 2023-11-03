import {Component, Input, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {NgbCollapse} from '@ng-bootstrap/ng-bootstrap';

// service
import {AuthenticationService} from 'src/app/core/service/auth.service';
import {EventService} from 'src/app/core/service/event.service';

// utility
import {changeBodyAttribute, findAllParent, findMenuItem} from '../helper/utils';

// types
import {User} from 'src/app/core/models/auth.models';
import {MenuItem} from '../models/menu.model';

// data
import {MENU_ITEMS} from '../config/menu-meta';

@Component({
    selector: 'app-left-sidebar',
    templateUrl: './left-sidebar.component.html',
    styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

    @Input() includeUserProfile: boolean = false;

    leftSidebarClass = 'sidebar-enable';
    activeMenuItems: string[] = [];
    loggedInUser: User | null = {};
    menuItems: MenuItem[] = [];

    no_profile_img:string= "./assets/images/logo.png";

    constructor(
        router: Router,
        private authService: AuthenticationService,
        private eventService: EventService) {
        router.events.forEach((event) => {
            if (event instanceof NavigationEnd) {
                this._activateMenu(); //actiavtes menu
                this.hideMenu(); //hides leftbar on change of route
            }
        });


    }

    ngOnInit(): void {
        this.initMenu();
        this.loggedInUser = this.authService.currentUser();
    }

    ngOnChanges(): void {
        if (this.includeUserProfile) {
            changeBodyAttribute('data-sidebar-user', 'true');
        } else {
            changeBodyAttribute('data-sidebar-user', 'false');
        }
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
     * initialize menuitems
     */
    initMenu(): void {
        this.menuItems = MENU_ITEMS;
    }

    /**
     * Returns true or false if given menu item has child or not
     * @param item menuItem
     */
    hasSubmenu(menu: MenuItem): boolean {
        return menu.children ? true : false;
    }

    /**
     * activates menu
     */
    _activateMenu(): void {
        const div = document.getElementById('side-menu');
        let matchingMenuItem = null;

        if (div) {
            let items: any = div.getElementsByClassName('side-nav-link-ref');
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

                    const matchingObjs = [activeMt['key'], ...findAllParent(this.menuItems, activeMt)];

                    this.activeMenuItems = matchingObjs;

                    this.menuItems.forEach((menu: MenuItem) => {
                        menu.collapsed = !matchingObjs.includes(menu.key!);
                    });
                }
            }
        }
    }

    /**
     * toggles open menu
     * @param menuItem clicked menuitem
     * @param collapse collpase instance
     */
    toggleMenuItem(menuItem: MenuItem, collapse: NgbCollapse): void {
        collapse.toggle();
        let openMenuItems: string[];
        if (!menuItem.collapsed) {
            openMenuItems = ([menuItem['key'], ...findAllParent(this.menuItems, menuItem)]);
            this.menuItems.forEach((menu: MenuItem) => {
                if (!openMenuItems.includes(menu.key!)) {
                    menu.collapsed = true;
                }
            })
        }

    }

    /**
     * Hides the menubar
     */
    hideMenu() {
        document.body.classList.remove('sidebar-enable');
    }
}
