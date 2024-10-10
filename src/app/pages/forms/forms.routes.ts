import { Routes } from '@angular/router';

// Forms
import {
  AppAutocompleteComponent,
  AppButtonComponent,
  AppCheckboxComponent,
  AppDatepickerComponent,
  AppRadioComponent,
} from './form-elements';
import { AppFormHorizontalComponent } from './form-horizontal/form-horizontal.component';
import { AppFormLayoutsComponent } from './form-layouts/form-layouts.component';
import { AppFormVerticalComponent } from './form-vertical/form-vertical.component';
import { AppFormWizardComponent } from './form-wizard/form-wizard.component';

export const FormsRoutes: Routes = [
  {
    path: 'forms-elements',
    children: [
      {
        path: 'autocomplete',
        component: AppAutocompleteComponent,
        data: {
          title: 'Autocomplete',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Autocomplete' },
          ],
        },
      },
      {
        path: 'button',
        component: AppButtonComponent,
        data: {
          title: 'Button',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Button' },
          ],
        },
      },
      {
        path: 'checkbox',
        component: AppCheckboxComponent,
        data: {
          title: 'Checkbox',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Checkbox' },
          ],
        },
      },

      {
        path: 'radio',
        component: AppRadioComponent,
        data: {
          title: 'Radio Button',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Radio Button' },
          ],
        },
      },
      {
        path: 'datepicker',
        component: AppDatepickerComponent,
        data: {
          title: 'Datepicker',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Datepicker' },
          ],
        },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'form-layouts',
        component: AppFormLayoutsComponent,
        data: {
          title: 'Form Layouts',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Form Layouts' },
          ],
        },
      },
      {
        path: 'form-horizontal',
        component: AppFormHorizontalComponent,
        data: {
          title: 'Form Horizontal',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Form Horizontal' },
          ],
        },
      },
      {
        path: 'form-vertical',
        component: AppFormVerticalComponent,
        data: {
          title: 'Form Vertical',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Form Vertical' },
          ],
        },
      },
      {
        path: 'form-wizard',
        component: AppFormWizardComponent,
        data: {
          title: 'Form Wizard',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Form Wizard' },
          ],
        },
      },
    ],
  },
];
