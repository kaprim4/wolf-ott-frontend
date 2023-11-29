import {Component, Input, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {NgbCollapse} from '@ng-bootstrap/ng-bootstrap';

// service
import {AuthenticationService} from 'src/app/core/service/auth.service';
import {EventService} from 'src/app/core/service/event.service';

// utility
import {changeBodyAttribute, findAllParent, findMenuItem} from '../helper/utils';

// types
import {MenuItem} from '../models/menu.model';

// data
import {MENU_ITEMS} from '../config/menu-meta';
import {TokenService} from "../../../core/service/token.service";

@Component({
    selector: 'app-left-sidebar',
    templateUrl: './left-sidebar.component.html',
    styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

    @Input() includeUserProfile: boolean = false;

    leftSidebarClass = 'sidebar-enable';
    activeMenuItems: string[] = [];
    loggedInUser: any;
    menuItems: MenuItem[] = [];
    no_profile_img: string = "./assets/images/logo.png";

    constructor(
        router: Router,
        private authService: AuthenticationService,
        private tokenService: TokenService,
        private eventService: EventService) {
        router.events.forEach((event) => {
            if (event instanceof NavigationEnd) {
                this._activateMenu(); //activates menu
                this.hideMenu(); //hides left-bar on change of route
            }
        });
    }

    ngOnInit(): void {
        this.loggedInUser = this.tokenService.getPayload();
        this.initMenu();
    }

    ngOnChanges(): void {
        if (this.includeUserProfile) {
            changeBodyAttribute('data-sidebar-user', 'true');
        } else {
            changeBodyAttribute('data-sidebar-user', 'false');
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this._activateMenu();
        });
    }

    initMenu(): void {
        this.menuItems = [
            {key: 'navigation', label: 'Navigation', isTitle: true},
            {
                key: 'dashboard',
                label: 'Tableau de bord',
                isTitle: false,
                icon: 'mdi mdi-view-dashboard-outline',
                //badge: {variant: 'success', text: '9+'},
                url: '/dashboard',
            },
            {key: 'modules', label: 'Modules', isTitle: true},
            {
                key: 'voucher',
                label: 'Gestion bons',
                icon: 'fa fa-money-bill-wave',
                //badge: {variant: 'success', text: '9+'},
                isTitle: false,
                children: [
                    {
                        key: 'voucher-customer',
                        label: 'Consulter les clients',
                        icon: 'admin',
                        url: '/vouchers/voucher-customer',
                        parentKey: 'voucher',
                    },
                    {
                        key: 'voucher-control',
                        label: 'Bons de contrôle',
                        icon: 'admin',
                        url: '/vouchers/voucher-control',
                        parentKey: 'voucher',
                    },
                    {
                        key: 'voucher-type',
                        label: 'Type des bons',
                        url: '/vouchers/voucher-type',
                        parentKey: 'voucher',
                    },
                    {
                        key: 'voucher-consult',
                        label: 'Consulter les bons',
                        url: '/vouchers/voucher-consult',
                        parentKey: 'voucher',
                    },
                    {
                        key: 'end-day',
                        label: 'Clôturer la journée',
                        url: '/vouchers/end-day',
                        parentKey: 'voucher',
                    },
                    {
                        key: 'pdf-generation',
                        label: 'Génération PDF',
                        url: '/vouchers/voucher-header-list',
                        parentKey: 'voucher',
                    },
                ]
            },
            {
                key: 'expense-funds',
                label: 'Caisses de dépense',
                icon: 'fas fa-cash-register',
                //badge: {variant: 'success', text: '9+'},
                isTitle: false,
                children: [
                    {
                        key: 'expense-funds-buttons',
                        label: 'Alimenter caisses',
                        url: '/base-ui/buttons',
                        parentKey: 'expense-funds',
                    },
                    {
                        key: 'expense-funds-buttons',
                        label: 'Saisir les dépenses',
                        url: '/base-ui/buttons',
                        parentKey: 'expense-funds',
                    },
                    {
                        key: 'expense-funds-buttons',
                        label: 'Journal de caisse',
                        url: '/base-ui/buttons',
                        parentKey: 'expense-funds',
                    },
                    {
                        key: 'expense-funds-buttons',
                        label: 'Consulter alimentations',
                        url: '/base-ui/buttons',
                        parentKey: 'expense-funds',
                    },
                    {
                        key: 'expense-funds-buttons',
                        label: 'Consulter dépenses',
                        url: '/base-ui/buttons',
                        parentKey: 'expense-funds',
                    },
                ]
            },
            {
                key: 'human-resources',
                label: 'Ressources humaines',
                icon: 'fa fa-address-card',
                //badge: {variant: 'success', text: '9+'},
                isTitle: false,
                children: [
                    {
                        key: 'human-resources-buttons',
                        label: 'Saisir les présences',
                        url: '/base-ui/buttons',
                        parentKey: 'human-resources',
                    },
                    {
                        key: 'human-resources-buttons',
                        label: 'Journal de présence',
                        url: '/base-ui/buttons',
                        parentKey: 'human-resources',
                    },
                    {
                        key: 'human-resources-buttons',
                        label: 'Procédures',
                        url: '/base-ui/buttons',
                        parentKey: 'human-resources',
                    },
                ]
            },
            {
                key: 'prepaid-cards',
                label: 'Cartes prépayées',
                icon: 'ti-credit-card',
                //badge: {variant: 'success', text: '9+'},
                isTitle: false,
                children: [
                    {
                        key: 'human-resources-buttons',
                        label: 'Formulaire d\'adhésion des Cartes PP',
                        url: '/base-ui/buttons',
                        parentKey: 'prepaid-cards',
                    },
                ]
            }
        ];
        if (this.loggedInUser && this.loggedInUser.role_id === 1) {
            this.menuItems.push(
                {key: 'manage', label: 'Gestion', isTitle: true},
                {
                    key: 'manage',
                    label: 'Modules',
                    icon: 'fas fa-cogs',
                    isTitle: false,
                    url: '/base-ui/buttons',
                    children: []
                },
                {
                    key: 'dictionnary',
                    label: 'Dictionnaire',
                    icon: 'fas fa-book',
                    isTitle: false,
                    children: [
                        {
                            key: 'gas_stations',
                            label: 'Stations-services',
                            url: '/dictionnary/gas-stations',
                            icon: 'fas fa-gas-pump me-1',
                            parentKey: 'dictionnary',
                        },
                        {
                            key: 'supervisors',
                            label: 'Superviseurs',
                            url: '/dictionnary/supervisors',
                            icon: 'fas fa-user-tie me-1',
                            parentKey: 'dictionnary',
                        },
                        {
                            key: 'companies',
                            label: 'Sociétés',
                            url: '/dictionnary/companies',
                            icon: 'fas fa-building me-1',
                            parentKey: 'dictionnary',
                        },
                        {
                            key: 'regions',
                            label: 'Régions',
                            url: '/dictionnary/regions',
                            icon: 'fas fa-map-marked-alt me-1',
                            parentKey: 'dictionnary',
                        },
                        {
                            key: 'cities',
                            label: 'Villes',
                            url: '/dictionnary/cities',
                            icon: 'fas fa-city me-1',
                            parentKey: 'dictionnary',
                        },
                        {
                            key: 'voucher-types',
                            label: 'Types de bon',
                            url: '/dictionnary/voucher-types',
                            icon: 'far fa-money-bill-alt me-1',
                            parentKey: 'dictionnary',
                        },
                    ]
                },
                {
                    key: 'parameters',
                    label: 'Paramètres',
                    icon: 'fas fa-cog',
                    isTitle: false,
                    url: '/base-ui/buttons',
                    children: []
                },
                {key: 'users_access', label: 'Utilisateurs & Accès', isTitle: true},
                {
                    key: 'users',
                    label: 'Utilisateurs',
                    icon: 'fas fa-users',
                    isTitle: false,
                    url: '/users-access/users'
                },
                {
                    key: 'roles',
                    label: 'Rôles',
                    icon: 'fas fa-users-cog',
                    isTitle: false,
                    url: '/users-access/roles'
                },
            );
        }

        this.menuItems.push(
            {key: 'apps', label: 'Apps', isTitle: true},
            {
                key: 'apps-calendar',
                label: 'Calendar',
                isTitle: false,
                icon: 'mdi mdi-calendar-blank-outline',
                url: '/apps/calendar',
            },
            {
                key: 'apps-chat',
                label: 'Chat',
                isTitle: false,
                icon: 'mdi mdi-forum-outline',
                url: '/apps/chat',
            },
            {
                key: 'apps-email',
                label: 'Email',
                isTitle: false,
                icon: 'mdi mdi-email-outline',
                collapsed: true,
                children: [
                    {
                        key: 'email-inbox',
                        label: 'Inbox',
                        url: '/apps/email/inbox',
                        parentKey: 'apps-email',
                    },
                ],
            },
            {
                key: 'apps-tasks',
                label: 'Tasks',
                isTitle: false,
                icon: 'mdi mdi-clipboard-outline',
                collapsed: true,
                children: [
                    {
                        key: 'task-kanban',
                        label: 'Kanban Board',
                        url: '/apps/tasks/kanban',
                        parentKey: 'apps-tasks',
                    },
                    {
                        key: 'task-details',
                        label: 'Details',
                        url: '/apps/tasks/details',
                        parentKey: 'apps-tasks',
                    },
                ],
            },
            {
                key: 'apps-projects',
                label: 'Projects',
                isTitle: false,
                icon: 'mdi mdi-briefcase-variant-outline',
                url: '/apps/projects',
            },
            {
                key: 'apps-contacts',
                label: 'Contacts',
                isTitle: false,
                icon: 'mdi mdi-book-open-page-variant-outline',
                collapsed: true,
                children: [
                    {
                        key: 'contacts-list',
                        label: 'Members List',
                        url: '/apps/contacts/list',
                        parentKey: 'apps-contacts',
                    },
                    {
                        key: 'contacts-profile',
                        label: 'Profile',
                        url: '/apps/contacts/profile',
                        parentKey: 'apps-contacts',
                    },
                ],
            },
            {key: 'custom', label: 'Custom', isTitle: true},
            {
                key: 'extra-pages',
                label: 'Extra Pages',
                isTitle: false,
                icon: 'mdi mdi-file-multiple-outline',
                collapsed: true,
                children: [
                    {
                        key: 'page-starter',
                        label: 'Starter',
                        url: '/pages/starter',
                        parentKey: 'extra-pages',
                    },
                    {
                        key: 'page-pricing',
                        label: 'Pricing',
                        url: '/pages/pricing',
                        parentKey: 'extra-pages',
                    },
                    {
                        key: 'page-timeline',
                        label: 'Timeline',
                        url: '/pages/timeline',
                        parentKey: 'extra-pages',
                    },
                    {
                        key: 'page-invoice',
                        label: 'Invoice',
                        url: '/pages/invoice',
                        parentKey: 'extra-pages',
                    },
                    {
                        key: 'page-faq',
                        label: 'FAQs',
                        url: '/pages/faq',
                        parentKey: 'extra-pages',
                    },
                    {
                        key: 'page-gallery',
                        label: 'Gallery',
                        url: '/pages/gallery',
                        parentKey: 'extra-pages',
                    },

                    {
                        key: 'page-error-404',
                        label: 'Error - 404',
                        url: '/error-404',
                        parentKey: 'extra-pages',
                    },
                    {
                        key: 'page-error-500',
                        label: 'Error - 500',
                        url: '/error-500',
                        parentKey: 'extra-pages',
                    },
                    {
                        key: 'page-maintenance',
                        label: 'Maintenance',
                        url: '/maintenance',
                        parentKey: 'extra-pages',
                    },
                    {
                        key: 'page-coming-soon',
                        label: 'Coming Soon',
                        url: '/coming-soon',
                        parentKey: 'extra-pages',
                    },
                ],
            },
            {key: 'components', label: 'Components', isTitle: true},
            {
                key: 'base-ui',
                label: 'Base UI',
                isTitle: false,
                icon: 'mdi mdi-briefcase-outline',
                collapsed: true,
                children: [
                    {
                        key: 'base-ui-buttons',
                        label: 'Buttons',
                        url: '/base-ui/buttons',
                        parentKey: 'base-ui',
                    },
                    {
                        key: 'base-ui-cards',
                        label: 'Cards',
                        url: '/base-ui/cards',
                        parentKey: 'base-ui',
                    },
                    {
                        key: 'base-ui-avatars',
                        label: 'Avatars',
                        url: '/base-ui/avatars',
                        parentKey: 'base-ui',
                    },
                    {
                        key: 'base-ui-tabs-accordions',
                        label: 'Tabs & Accordions',
                        url: '/base-ui/tabs-accordions',
                        parentKey: 'base-ui',
                    },
                    {
                        key: 'base-ui-modals',
                        label: 'Modals',
                        url: '/base-ui/modals',
                        parentKey: 'base-ui',
                    },
                    {
                        key: 'base-ui-progress',
                        label: 'Progress',
                        url: '/base-ui/progress',
                        parentKey: 'base-ui',
                    },
                    {
                        key: 'base-ui-notifications',
                        label: 'Notifications',
                        url: '/base-ui/notifications',
                        parentKey: 'base-ui',
                    },
                    {
                        key: 'base-ui-placeholders',
                        label: 'Placeholders',
                        url: '/base-ui/placeholders',
                        parentKey: 'base-ui',
                    },
                    {
                        key: 'base-ui-spinners',
                        label: 'Spinners',
                        url: '/base-ui/spinners',
                        parentKey: 'base-ui',
                    },
                    {
                        key: 'base-ui-images',
                        label: 'Images',
                        url: '/base-ui/images',
                        parentKey: 'base-ui',
                    },
                    {
                        key: 'base-ui-carousel',
                        label: 'Carousel',
                        url: '/base-ui/carousel',
                        parentKey: 'base-ui',
                    },
                    {
                        key: 'base-ui-embedvideo',
                        label: 'Embed Video',
                        url: '/base-ui/embed-video',
                        parentKey: 'base-ui',
                    },
                    {
                        key: 'base-ui-dropdown',
                        label: 'Dropdowns',
                        url: '/base-ui/dropdowns',
                        parentKey: 'base-ui',
                    },
                    {
                        key: 'base-ui-popovers-tooltips',
                        label: 'Tooltips & Popovers',
                        url: '/base-ui/popovers-tooltips',
                        parentKey: 'base-ui',
                    },
                    {
                        key: 'base-ui-general',
                        label: 'General UI',
                        url: '/base-ui/general',
                        parentKey: 'base-ui',
                    },
                    {
                        key: 'base-ui-typography',
                        label: 'Typography',
                        url: '/base-ui/typography',
                        parentKey: 'base-ui',
                    },
                    {
                        key: 'base-ui-grid',
                        label: 'Grid',
                        url: '/base-ui/grid',
                        parentKey: 'base-ui',
                    },
                ],
            },
            {
                key: 'widgets',
                label: 'Widgets',
                isTitle: false,
                icon: 'mdi mdi-gift-outline',
                url: '/widgets',
            },
            {
                key: 'extended-ui',
                label: 'Extended UI',
                isTitle: false,
                icon: 'mdi mdi-layers-outline',
                badge: {variant: 'info', text: 'Hot'},
                collapsed: true,
                children: [
                    {
                        key: 'extended-ui-rangesliders',
                        label: 'Range Sliders',
                        url: '/extended-ui/rangesliders',
                        parentKey: 'extended-ui',
                    },
                    {
                        key: 'extended-ui-sweet-alert',
                        label: 'Sweet Alert',
                        url: '/extended-ui/sweet-alert',
                        parentKey: 'extended-ui',
                    },
                    {
                        key: 'extended-ui-draggable-cards',
                        label: 'Draggable Cards',
                        url: '/extended-ui/draggable-cards',
                        parentKey: 'extended-ui',
                    },
                    {
                        key: 'extended-ui-tour',
                        label: 'Tour Page',
                        url: '/extended-ui/tour',
                        parentKey: 'extended-ui',
                    },
                    {
                        key: 'extended-ui-tree-view',
                        label: 'Tree View',
                        url: '/extended-ui/tree-view',
                        parentKey: 'extended-ui',
                    },
                ],
            },
            {
                key: 'icons',
                label: 'Icons',
                isTitle: false,
                icon: 'mdi mdi-shield-outline',
                collapsed: true,
                children: [
                    {
                        key: 'icon-feather',
                        label: 'Feather Icons',
                        url: '/icons/feather',
                        parentKey: 'icons',
                    },
                    {
                        key: 'icon-mdiicons',
                        label: 'Material Design Icons',
                        url: '/icons/mdi',
                        parentKey: 'icons',
                    },
                    {
                        key: 'icon-dripicons',
                        label: 'Dripicons',
                        url: '/icons/dripicons',
                        parentKey: 'icons',
                    },
                    {
                        key: 'icon-font-awesome',
                        label: 'Font Awesome 5',
                        url: '/icons/font-awesome',
                        parentKey: 'icons',
                    },
                    {
                        key: 'icon-themify',
                        label: 'Themify',
                        url: '/icons/themify',
                        parentKey: 'icons',
                    },
                ],
            },
            {
                key: 'forms',
                label: 'Forms',
                isTitle: false,
                icon: 'mdi mdi-texture',
                collapsed: true,
                children: [
                    {
                        key: 'form-basic',
                        label: 'General Elements',
                        url: '/forms/basic',
                        parentKey: 'forms',
                    },
                    {
                        key: 'form-advanced',
                        label: 'Form Advanced',
                        url: '/forms/advanced',
                        parentKey: 'forms',
                    },
                    {
                        key: 'form-validation',
                        label: 'Validation',
                        url: '/forms/validation',
                        parentKey: 'forms',
                    },
                    {
                        key: 'form-wizard',
                        label: 'Wizard',
                        url: '/forms/wizard',
                        parentKey: 'forms',
                    },
                    {
                        key: 'form-upload',
                        label: 'File Uploads',
                        url: '/forms/upload',
                        parentKey: 'forms',
                    },
                    {
                        key: 'form-editors',
                        label: 'Editors',
                        url: '/forms/editors',
                        parentKey: 'forms',
                    },
                ],
            },
            {
                key: 'tables',
                label: 'Tables',
                isTitle: false,
                icon: 'mdi mdi-table',
                collapsed: true,
                children: [
                    {
                        key: 'table-basic',
                        label: 'Basic Tables',
                        url: '/tables/basic',
                        parentKey: 'tables',
                    },
                    {
                        key: 'table-advanced',
                        label: 'Advanced Tables',
                        url: '/tables/advanced',
                        parentKey: 'tables',
                    },
                ],
            },
            {
                key: 'charts',
                label: 'Charts',
                isTitle: false,
                icon: 'mdi mdi-chart-donut-variant',
                collapsed: true,
                children: [
                    {
                        key: 'chart-apex',
                        label: 'Apex Charts',
                        url: '/charts/apex',
                        parentKey: 'charts',
                    },
                    {
                        key: 'chart-chartjs',
                        label: 'Chartjs',
                        url: '/charts/chartjs',
                        parentKey: 'charts',
                    },
                ],
            },
            {
                key: 'maps',
                label: 'Maps',
                isTitle: false,
                icon: 'mdi mdi-map-outline',
                collapsed: true,
                children: [
                    {
                        key: 'maps-googlemaps',
                        label: 'Google Maps',
                        url: '/maps/google',
                        parentKey: 'maps',
                    },
                    {
                        key: 'maps-vectormaps',
                        label: 'Vector Maps',
                        url: '/maps/vector',
                        parentKey: 'maps',
                    },
                ],
            },
            {
                key: 'menu-levels',
                label: 'Menu Levels',
                isTitle: false,
                icon: 'mdi mdi-share-variant',
                collapsed: true,
                children: [
                    {
                        key: 'menu-levels-1-1',
                        label: 'Level 1.1',
                        url: '/',
                        parentKey: 'menu-levels',
                        collapsed: true,
                        children: [
                            {
                                key: 'menu-levels-2-1',
                                label: 'Level 2.1',
                                url: '/',
                                parentKey: 'menu-levels-1-1',
                                collapsed: true,
                                children: [
                                    {
                                        key: 'menu-levels-3-1',
                                        label: 'Level 3.1',
                                        url: '/',
                                        parentKey: 'menu-levels-2-1',
                                    },
                                    {
                                        key: 'menu-levels-3-2',
                                        label: 'Level 3.2',
                                        url: '/',
                                        parentKey: 'menu-levels-2-1',
                                    },
                                ],
                            },
                            {
                                key: 'menu-levels-2-2',
                                label: 'Level 2.2',
                                url: '/',
                                parentKey: 'menu-levels-1-1',
                            },
                        ],
                    },
                    {
                        key: 'menu-levels-1-2',
                        label: 'Level 1.2',
                        url: '/',
                        parentKey: 'menu-levels',
                    },
                ],
            }
        );
    }

    hasSubmenu(menu: MenuItem): boolean {
        return !!menu.children;
    }

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

    hideMenu() {
        document.body.classList.remove('sidebar-enable');
    }
}
