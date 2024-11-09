import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import {NewsAddComponent} from "./news-add/news-add.component";
import {NewsEditComponent} from "./news-edit/news-edit.component";
import {NewsListComponent} from "./news-list/news-list.component";
import {MatAnchor, MatButton, MatIconAnchor, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatListItemAvatar} from "@angular/material/list";
import {MatPaginator} from "@angular/material/paginator";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatSort} from "@angular/material/sort";
import {TablerIconsModule} from "angular-tabler-icons";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTab, MatTabGroup} from "@angular/material/tabs";


@NgModule({
  declarations: [
      NewsAddComponent,
      NewsEditComponent,
      NewsListComponent
  ],
    imports: [
        CommonModule,
        NewsRoutingModule,
        MatAnchor,
        MatCard,
        MatCardContent,
        MatCell,
        MatCellDef,
        MatCheckbox,
        MatColumnDef,
        MatFormField,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatIcon,
        MatIconAnchor,
        MatIconButton,
        MatInput,
        MatListItemAvatar,
        MatPaginator,
        MatProgressBar,
        MatRow,
        MatRowDef,
        MatSort,
        MatTable,
        TablerIconsModule,
        FormsModule,
        MatHeaderCellDef,
        MatButton,
        MatCardHeader,
        MatCardTitle,
        MatLabel,
        MatTab,
        MatTabGroup,
        ReactiveFormsModule
    ]
})
export class NewsModule { }
