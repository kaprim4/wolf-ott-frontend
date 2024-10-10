import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninPage } from './pages/signin/signin.page';
import { SignupPage } from './pages/signup/signup.page';
import { SigninFormComponent } from './forms/signin-form/signin-form.component';
import { SignupFormComponent } from './forms/signup-form/signup-form.component';
import { AuthRoutes } from './auth.routes';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthClassicLayout } from './layouts/auth-classic-layout/classic.layout';
import { AuthModernLayout } from './layouts/auth-modern-layout/modern.layout';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SigninPage, SignupPage, SigninFormComponent, SignupFormComponent, AuthClassicLayout, AuthModernLayout],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class AuthModule { }
