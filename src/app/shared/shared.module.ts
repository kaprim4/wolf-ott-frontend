import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { LineService } from './services/line.service';
import { UserService } from './services/user.service';
import { PackageService } from './services/package.service';
import { BouquetService } from './services/bouquet.service';



@NgModule({
  declarations: [
    // LineService,
    // UserService,
    // PackageService,
    // BouquetService,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule,
  ]
})
export class SharedModule { }

