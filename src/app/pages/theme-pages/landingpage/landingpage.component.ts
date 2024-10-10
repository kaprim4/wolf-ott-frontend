import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { ViewportScroller } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { RouterLink } from '@angular/router';

interface apps {
  id: number;
  img: string;
  title: string;
  subtitle: string;
  link: string;
}

interface quicklinks {
  id: number;
  title: string;
  link: string;
}

interface demos {
  id: number;
  name: string;
  subtext?: string;
  url: string;
  imgSrc: string;
}

interface testimonials {
  id: number;
  name: string;
  subtext: string;
  imgSrc: string;
}

interface features {
  id: number;
  icon: string;
  title: string;
  subtext: string;
  color: string;
}

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, RouterLink],
  templateUrl: './landingpage.component.html',
})
export class AppLandingpageComponent {
  @Input() showToggle = true;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  options = this.settings.getOptions();

  constructor(
    private settings: CoreService,
    private scroller: ViewportScroller
  ) {}

  // scroll to demos
  gotoDemos() {
    this.scroller.scrollToAnchor('demos');
  }

  apps: apps[] = [
    {
      id: 1,
      img: '/assets/images/svgs/icon-dd-chat.svg',
      title: 'Chat Application',
      subtitle: 'Messages & Emails',
      link: '/apps/chat',
    },
    {
      id: 2,
      img: '/assets/images/svgs/icon-dd-cart.svg',
      title: 'eCommerce App',
      subtitle: 'Buy a Product',
      link: '/apps/email/inbox',
    },
    {
      id: 3,
      img: '/assets/images/svgs/icon-dd-invoice.svg',
      title: 'Invoice App',
      subtitle: 'Get latest invoice',
      link: '/apps/invoice',
    },
    {
      id: 4,
      img: '/assets/images/svgs/icon-dd-date.svg',
      title: 'Calendar App',
      subtitle: 'Get Dates',
      link: '/apps/calendar',
    },
    {
      id: 5,
      img: '/assets/images/svgs/icon-dd-mobile.svg',
      title: 'Contact Application',
      subtitle: '2 Unsaved Contacts',
      link: '/apps/contacts',
    },
    {
      id: 6,
      img: '/assets/images/svgs/icon-dd-lifebuoy.svg',
      title: 'Tickets App',
      subtitle: 'Create new ticket',
      link: '/apps/tickets',
    },
    {
      id: 7,
      img: '/assets/images/svgs/icon-dd-message-box.svg',
      title: 'Email App',
      subtitle: 'Get new emails',
      link: '/apps/email/inbox',
    },
    {
      id: 8,
      img: '/assets/images/svgs/icon-dd-application.svg',
      title: 'Courses',
      subtitle: 'Create new course',
      link: '/apps/courses',
    },
  ];

  demos: demos[] = [
    {
      id: 1,
      imgSrc: '/assets/images/landingpage/demos/demo-main.jpg',
      name: 'Main',
      subtext: 'Demo',
      url: 'https://spike-angular-pro-main.netlify.app/dashboards/dashboard1',
    },
    {
      id: 2,
      imgSrc: '/assets/images/landingpage/demos/demo-dark.jpg',
      name: 'Dark',
      subtext: 'Demo',
      url: 'https://spike-angular-pro-dark.netlify.app/dashboards/dashboard2',
    },
    {
      id: 5,
      imgSrc: '/assets/images/landingpage/demos/demo-horizontal.jpg',
      name: 'Horizontal',
      subtext: 'Demo',
      url: 'https://spike-angular-pro-horizontal.netlify.app/dashboards/dashboard2',
    },
    {
      id: 3,
      imgSrc: '/assets/images/landingpage/demos/demo-rtl.jpg',
      name: 'RTL',
      subtext: 'Demo',
      url: 'https://spike-angular-pro-rtl.netlify.app/dashboards/dashboard1',
    },
    {
      id: 4,
      imgSrc: '/assets/images/landingpage/demos/demo-minisidebar.jpg',
      name: 'Minisidebar',
      subtext: 'Demo',
      url: 'https://spike-angular-pro-minisidebar.netlify.app/dashboards/dashboard1',
    },
    {
      id: 5,
      imgSrc: '/assets/images/landingpage/demos/demo-authguard.jpg',
      name: 'Authguard',
      subtext: 'Demo',
      url: 'https://spike-angular-pro-authguard.netlify.app/authentication/side-login',
    },
  ];

  appdemos: demos[] = [
    {
      id: 1,
      imgSrc: '/assets/images/landingpage/apps/app-calendar.jpg',
      name: 'Calendar',
      subtext: 'Application',
      url: 'https://spike-angular-pro-main.netlify.app/apps/calendar',
    },
    {
      id: 2,
      imgSrc: '/assets/images/landingpage/apps/app-chat.jpg',
      name: 'Chat',
      subtext: 'Application',
      url: 'https://spike-angular-pro-main.netlify.app/apps/chat',
    },
    {
      id: 3,
      imgSrc: '/assets/images/landingpage/apps/app-contact.jpg',
      name: 'Contact',
      subtext: 'Application',
      url: 'https://spike-angular-pro-main.netlify.app/apps/contacts',
    },
    {
      id: 4,
      imgSrc: '/assets/images/landingpage/apps/app-email.jpg',
      name: 'Email',
      subtext: 'Application',
      url: 'https://spike-angular-pro-main.netlify.app/apps/email/inbox',
    },
    {
      id: 5,
      imgSrc: '/assets/images/landingpage/apps/app-courses.jpg',
      name: 'Courses',
      subtext: 'Application',
      url: 'https://spike-angular-pro-main.netlify.app/apps/courses',
    },
    {
      id: 6,
      imgSrc: '/assets/images/landingpage/apps/app-employee.jpg',
      name: 'Employee',
      subtext: 'Application',
      url: 'https://spike-angular-pro-main.netlify.app/apps/employee',
    },
    {
      id: 7,
      imgSrc: '/assets/images/landingpage/apps/app-note.jpg',
      name: 'Notes',
      subtext: 'Application',
      url: 'https://spike-angular-pro-main.netlify.app/apps/notes',
    },
    {
      id: 8,
      imgSrc: '/assets/images/landingpage/apps/app-ticket.jpg',
      name: 'Tickets',
      subtext: 'Application',
      url: 'https://spike-angular-pro-main.netlify.app/apps/tickets',
    },
    {
      id: 9,
      imgSrc: '/assets/images/landingpage/apps/app-invoice.jpg',
      name: 'Invoice',
      subtext: 'Application',
      url: 'https://spike-angular-pro-main.netlify.app/apps/invoice',
    },
    {
      id: 10,
      imgSrc: '/assets/images/landingpage/apps/app-todo.jpg',
      name: 'Todo',
      subtext: 'Application',
      url: 'https://spike-angular-pro-main.netlify.app/apps/todo',
    },
    {
      id: 11,
      imgSrc: '/assets/images/landingpage/apps/app-taskboard.jpg',
      name: 'Taskboard',
      subtext: 'Application',
      url: 'https://spike-angular-pro-main.netlify.app/apps/taskboard',
    },
    {
      id: 12,
      imgSrc: '/assets/images/landingpage/apps/app-blog.jpg',
      name: 'Blog List',
      subtext: 'Application',
      url: 'https://spike-angular-pro-main.netlify.app/apps/blog/post',
    },
  ];

  testimonials: testimonials[] = [
    {
      id: 1,
      imgSrc: '/assets/images/profile/user-1.jpg',
      name: 'Jenny Wilson',
      subtext: 'Features avaibility',
    },
    {
      id: 2,
      imgSrc: '/assets/images/profile/user-2.jpg',
      name: 'Minshan Cui',
      subtext: 'Features avaibility',
    },
    {
      id: 3,
      imgSrc: '/assets/images/profile/user-3.jpg',
      name: 'Eminson Mendoza',
      subtext: 'Features avaibility',
    },
  ];

  features: features[] = [
    {
      id: 1,
      icon: 'wand',
      title: '6 Theme Colors',
      color: 'primary',
      subtext:
        'We have included 6 pre-defined Theme Colors with Elegant Admin.',
    },
    {
      id: 2,
      icon: 'shield-lock',
      title: 'Authguard',
      color: 'accent',
      subtext:
        'AuthGuard is used to protect the routes from unauthorized access in angular..',
    },
    {
      id: 3,
      icon: 'archive',
      title: '80+ Page Templates',
      color: 'warning',
      subtext: 'Yes, we have 6 demos & 80+ Pages per demo to make it easier.',
    },
    {
      id: 4,
      icon: 'adjustments',
      title: '50+ UI Components',
      color: 'error',
      subtext: 'Almost 50+ UI Components being given with Spike Admin Pack.',
    },
    {
      id: 5,
      icon: 'tag',
      title: 'Material ',
      color: 'success',
      subtext: 'Its been made with Material and full responsive layout.',
    },
    {
      id: 9,
      icon: 'chart-pie',
      title: 'Lots of Chart Options',
      color: 'error',
      subtext: 'You name it and we have it, Yes lots of variations for Charts.',
    },
    {
      id: 7,
      icon: 'language-katakana',
      title: 'i18 Angular',
      color: 'accent',
      subtext: 'i18 is a powerful internationalization framework.',
    },
    {
      id: 13,
      icon: 'calendar',
      title: 'Calendar Design',
      color: 'warning',
      subtext: 'Calendar is available with our package & in nice design.',
    },

    {
      id: 6,
      icon: 'diamond',
      title: '3400+ Font Icons',
      color: 'primary',
      subtext: 'Lots of Icon Fonts are included here in the package of Admin.',
    },
    {
      id: 11,
      icon: 'refresh',
      title: 'Regular Updates',
      color: 'primary',
      subtext: 'We are constantly updating our pack with new features..',
    },
    {
      id: 8,
      icon: 'arrows-shuffle',
      title: 'Easy to Customize',
      color: 'accent',
      subtext: 'Customization will be easy as we understand your pain.',
    },
    {
      id: 10,
      icon: 'layers-intersect',
      title: 'Lots of Table Examples',
      color: 'success',
      subtext: 'Tables are initial requirement and we added them.',
    },
    {
      id: 14,
      icon: 'messages',
      title: 'Dedicated Support',
      color: 'error',
      subtext: 'We believe in supreme support is key and we offer that.',
    },
    {
      id: 12,
      icon: 'book',
      title: 'Detailed Documentation',
      color: 'warning',
      subtext: 'Our Detailed Documentation Ensures Ease of Use',
    },
  ];

  quicklinks: quicklinks[] = [
    {
      id: 1,
      title: 'Pricing Page',
      link: '/theme-pages/pricing',
    },
    {
      id: 2,
      title: 'Authentication Design',
      link: '/authentication/side-login',
    },
    {
      id: 3,
      title: 'Register Now',
      link: '/authentication/side-register',
    },
    {
      id: 4,
      title: '404 Error Page',
      link: '/authentication/error',
    },
    {
      id: 5,
      title: 'Notes App',
      link: '/apps/notes',
    },
    {
      id: 6,
      title: 'Employee App',
      link: '/apps/employee',
    },
    {
      id: 7,
      title: 'Todo Application',
      link: '/apps/todo',
    },
    {
      id: 8,
      title: 'Treeview',
      link: '/theme-pages/treeview',
    },
  ];
}
