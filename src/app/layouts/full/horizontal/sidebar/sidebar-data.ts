import { NavItem } from '../../vertical/sidebar/nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboards',
    iconName: 'home',
    route: 'dashboards',
    bgcolor: 'primary',
    children: [
      {
        displayName: 'Dashboard 1',
        iconName: 'point',
        route: 'dashboards/dashboard1',
      },
      {
        displayName: 'Dashboard 2',
        iconName: 'point',
        route: 'dashboards/dashboard2',
      },
    ],
  },
  {
    displayName: 'Apps',
    iconName: 'apps',
    route: 'apps',
    bgcolor: 'accent',
    ddType: '',
    children: [
      {
        displayName: 'Chat',
        iconName: 'point',
        route: 'apps/chat',
      },
      {
        displayName: 'Calendar',
        iconName: 'point',
        route: 'apps/calendar',
      },
      {
        displayName: 'Email',
        iconName: 'point',
        route: 'apps/email/inbox',
      },
      {
        displayName: 'Contacts',
        iconName: 'point',
        route: 'apps/contacts',
      },
      {
        displayName: 'Courses',
        iconName: 'point',
        route: 'apps/courses',
      },
      {
        displayName: 'Employee',
        iconName: 'point',
        route: 'apps/employee',
      },
      {
        displayName: 'Notes',
        iconName: 'point',
        route: 'apps/notes',
      },
      {
        displayName: 'Tickets',
        iconName: 'point',
        route: 'apps/tickets',
      },
      {
        displayName: 'Invoice',
        iconName: 'point',
        route: 'apps/invoice',
      },
      {
        displayName: 'ToDo',
        iconName: 'point',
        route: 'apps/todo',
      },
      {
        displayName: 'Taskboard',
        iconName: 'point',
        route: 'apps/taskboard',
      },
      {
        displayName: 'Blog',
        iconName: 'point',
        route: 'apps/blog',
        children: [
          {
            displayName: 'Post',
            iconName: 'point',
            route: 'apps/blog/post',
          },
          {
            displayName: 'Detail',
            iconName: 'point',
            route: 'apps/blog/detail/Early Black Friday Amazon deals: cheap TVs, headphones, laptops',
          },
        ],
      },
    ],
  },
  {
    displayName: 'Ui',
    iconName: 'components',
    route: 'ui-components',
    bgcolor: 'warning',
    ddType: '',
    children: [
      {
        displayName: 'Badge',
        iconName: 'point',
        route: 'ui-components/badge',
      },
      {
        displayName: 'Expansion Panel',
        iconName: 'point',
        route: 'ui-components/expansion',
      },
      {
        displayName: 'Chips',
        iconName: 'point',
        route: 'ui-components/chips',
      },
      {
        displayName: 'Dialog',
        iconName: 'point',
        route: 'ui-components/dialog',
      },
      {
        displayName: 'Lists',
        iconName: 'point',
        route: 'ui-components/lists',
      },
      {
        displayName: 'Divider',
        iconName: 'point',
        route: 'ui-components/divider',
      },
      {
        displayName: 'Menu',
        iconName: 'point',
        route: 'ui-components/menu',
      },
      {
        displayName: 'Paginator',
        iconName: 'point',
        route: 'ui-components/paginator',
      },
      {
        displayName: 'Progress Bar',
        iconName: 'point',
        route: 'ui-components/progress',
      },
      {
        displayName: 'Progress Spinner',
        iconName: 'point',
        route: 'ui-components/progress-spinner',
      },
      {
        displayName: 'Ripples',
        iconName: 'point',
        route: 'ui-components/ripples',
      },
      {
        displayName: 'Slide Toggle',
        iconName: 'point',
        route: 'ui-components/slide-toggle',
      },
      {
        displayName: 'Slider',
        iconName: 'point',
        route: 'ui-components/slider',
      },
      {
        displayName: 'Snackbar',
        iconName: 'point',
        route: 'ui-components/snackbar',
      },
      {
        displayName: 'Tabs',
        iconName: 'point',
        route: 'ui-components/tabs',
      },
      {
        displayName: 'Toolbar',
        iconName: 'point',
        route: 'ui-components/toolbar',
      },
      {
        displayName: 'Tooltips',
        iconName: 'point',
        route: 'ui-components/tooltips',
      },
    ],
  },
  {
    displayName: 'Pages',
    iconName: 'clipboard',
    bgcolor: 'error',
    route: '',
    children: [
      {
        displayName: 'Treeview',
        iconName: 'point',
        route: 'theme-pages/treeview',
      },
      {
        displayName: 'Pricing',
        iconName: 'point',
        route: 'theme-pages/pricing',
      },
      {
        displayName: 'Account Setting',
        iconName: 'point',
        route: 'theme-pages/account-setting',
      },
      {
        displayName: 'FAQ',
        iconName: 'point',
        route: 'theme-pages/faq',
      },
      {
        displayName: 'Landingpage',
        iconName: 'point',
        route: 'landingpage',
      },
      {
        displayName: 'Widgets',
        iconName: 'point',
        route: 'widgets',
        children: [
          {
            displayName: 'Cards',
            iconName: 'point',
            route: 'widgets/cards',
          },
          {
            displayName: 'Banners',
            iconName: 'point',
            route: 'widgets/banners',
          },
          {
            displayName: 'Charts',
            iconName: 'point',
            route: 'widgets/charts',
          },
        ],
      },
      {
        displayName: 'Charts',
        iconName: 'point',
        route: 'charts',
        children: [
          {
            displayName: 'Line',
            iconName: 'point',
            route: '/charts/line',
          },
          {
            displayName: 'Gredient',
            iconName: 'point',
            route: '/charts/gredient',
          },
          {
            displayName: 'Area',
            iconName: 'point',
            route: '/charts/area',
          },
          {
            displayName: 'Candlestick',
            iconName: 'point',
            route: '/charts/candlestick',
          },
          {
            displayName: 'Column',
            iconName: 'point',
            route: '/charts/column',
          },
          {
            displayName: 'Doughnut & Pie',
            iconName: 'point',
            route: '/charts/doughnut-pie',
          },
          {
            displayName: 'Radialbar & Radar',
            iconName: 'point',
            route: '/charts/radial-radar',
          },
        ],
      },
      {
        displayName: 'Auth',
        iconName: 'point',
        route: '/',
        children: [
          {
            displayName: 'Login',
            iconName: 'point',
            route: '/authentication',
            children: [
              {
                displayName: 'Login',
                iconName: 'point',
                route: '/authentication/side-login',
              },
              {
                displayName: 'Boxed Login',
                iconName: 'point',
                route: '/authentication/boxed-login',
              },
            ],
          },
          {
            displayName: 'Register',
            iconName: 'point',
            route: '/authentication',
            children: [
              {
                displayName: 'Register',
                iconName: 'point',
                route: '/authentication/side-register',
              },
              {
                displayName: 'Boxed Register',
                iconName: 'point',
                route: '/authentication/boxed-register',
              },
            ],
          },
          {
            displayName: 'Forgot Password',
            iconName: 'point',
            route: '/authentication',
            children: [
              {
                displayName: 'Side Forgot Password',
                iconName: 'point',
                route: '/authentication/side-forgot-pwd',
              },
              {
                displayName: 'Boxed Forgot Password',
                iconName: 'point',
                route: '/authentication/boxed-forgot-pwd',
              },
            ],
          },
          {
            displayName: 'Two Steps',
            iconName: 'point',
            route: '/authentication',
            children: [
              {
                displayName: 'Side Two Steps',
                iconName: 'point',
                route: '/authentication/side-two-steps',
              },
              {
                displayName: 'Boxed Two Steps',
                iconName: 'point',
                route: '/authentication/boxed-two-steps',
              },
            ],
          },
          {
            displayName: 'Error',
            iconName: 'point',
            route: '/authentication/error',
          },
          {
            displayName: 'Maintenance',
            iconName: 'point',
            route: '/authentication/maintenance',
          },
        ],
      },
    ],
  },
  {
    displayName: 'Forms',
    iconName: 'file-description',
    route: 'forms',
    bgcolor: 'success',
    children: [
      {
        displayName: 'Form elements',
        iconName: 'point',
        route: 'forms/forms-elements',
        children: [
          {
            displayName: 'Autocomplete',
            iconName: 'point',
            route: 'forms/forms-elements/autocomplete',
          },
          {
            displayName: 'Button',
            iconName: 'point',
            route: 'forms/forms-elements/button',
          },
          {
            displayName: 'Checkbox',
            iconName: 'point',
            route: 'forms/forms-elements/checkbox',
          },
          {
            displayName: 'Radio',
            iconName: 'point',
            route: 'forms/forms-elements/radio',
          },
          {
            displayName: 'Datepicker',
            iconName: 'point',
            route: 'forms/forms-elements/datepicker',
          },
        ],
      },
      {
        displayName: 'Form Layouts',
        iconName: 'point',
        route: '/forms/form-layouts',
      },
      {
        displayName: 'Form Horizontal',
        iconName: 'point',
        route: '/forms/form-horizontal',
      },
      {
        displayName: 'Form Vertical',
        iconName: 'point',
        route: '/forms/form-vertical',
      },
      {
        displayName: 'Form Wizard',
        iconName: 'point',
        route: '/forms/form-wizard',
      },
    ],
  },
  {
    displayName: 'Tables',
    iconName: 'layout',
    route: 'tables',
    bgcolor: 'primary',
    children: [
      {
        displayName: 'Basic Table',
        iconName: 'point',
        route: 'tables/basic-table',
      },
      {
        displayName: 'Dynamic Table',
        iconName: 'point',
        route: 'tables/dynamic-table',
      },
      {
        displayName: 'Expand Table',
        iconName: 'point',
        route: 'tables/expand-table',
      },
      {
        displayName: 'Filterable Table',
        iconName: 'point',
        route: 'tables/filterable-table',
      },
      {
        displayName: 'Footer Row Table',
        iconName: 'point',
        route: 'tables/footer-row-table',
      },
      {
        displayName: 'HTTP Table',
        iconName: 'point',
        route: 'tables/http-table',
      },
      {
        displayName: 'Mix Table',
        iconName: 'point',
        route: 'tables/mix-table',
      },
      {
        displayName: 'Multi Header Footer',
        iconName: 'point',
        route: 'tables/multi-header-footer-table',
      },
      {
        displayName: 'Pagination Table',
        iconName: 'point',
        route: 'tables/pagination-table',
      },
      {
        displayName: 'Row Context Table',
        iconName: 'point',
        route: 'tables/row-context-table',
      },
      {
        displayName: 'Selection Table',
        iconName: 'point',
        route: 'tables/selection-table',
      },
      {
        displayName: 'Sortable Table',
        iconName: 'point',
        route: 'tables/sortable-table',
      },
      {
        displayName: 'Sticky Column',
        iconName: 'point',
        route: 'tables/sticky-column-table',
      },
      {
        displayName: 'Sticky Header Footer',
        iconName: 'point',
        route: 'tables/sticky-header-footer-table',
      },
      {
        displayName: 'Data table',
        iconName: 'point',
        route: '/datatable/kichen-sink',
      },
    ],
  },
];
