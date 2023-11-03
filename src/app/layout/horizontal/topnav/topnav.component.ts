import {Component, Input, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
// utility function
import {findAllParent, findMenuItem} from '../../shared/helper/utils';
// types
import {MenuItem} from '../../shared/models/menu.model';
// data
import {HORIZONTAL_MENU_ITEMS} from '../../shared/config/menu-meta';


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

    constructor(
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

    ngAfterViewInit() {
        setTimeout(() => {
            this._activateMenu();
        });
    }

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

    hasSubmenu(menu: MenuItem): boolean {
        return menu.children ? true : false;
    }

    hasGrandChildren(menuItem: MenuItem): boolean {
        let hasGrandChild: MenuItem[] = menuItem.children && menuItem.children.filter((child: MenuItem) => child.children?.length && child.children);
        return hasGrandChild.length > 0;
    }

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
