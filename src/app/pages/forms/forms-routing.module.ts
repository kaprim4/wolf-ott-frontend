import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorsComponent } from './editors/editors.component';
import { FileUploadsComponent } from './file-uploads/file-uploads.component';
import { FormsAdvancedComponent } from './forms-advanced/forms-advanced.component';
import { GeneralComponent } from './general/general.component';
import { ValidationComponent } from './validation/validation.component';
import { WizardComponent } from './wizard/wizard.component';

const routes: Routes = [
  {
    path: 'basic',
    component: GeneralComponent
  },
  {
    path: 'advanced',
    component: FormsAdvancedComponent
  },
  {
    path: 'validation',
    component: ValidationComponent
  },
  {
    path: 'wizard',
    component: WizardComponent
  },
  {
    path: 'upload',
    component: FileUploadsComponent
  },
  {
    path: 'editors',
    component: EditorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
