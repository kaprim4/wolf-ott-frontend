import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RankingRoutingModule} from './ranking-routing.module';
import {RankListComponent} from "./rank-list/rank-list.component";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {TablerIconsModule} from "angular-tabler-icons";
import {MatInput} from "@angular/material/input";
import {MatAnchor, MatIconAnchor, MatIconButton} from "@angular/material/button";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
    MatTable
} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatListItemAvatar} from "@angular/material/list";


@NgModule({
    declarations: [
        RankListComponent
    ],
    imports: [
        CommonModule,
        RankingRoutingModule,
        MatCard,
        MatProgressBar,
        MatCardContent,
        MatFormField,
        MatIcon,
        TablerIconsModule,
        MatInput,
        MatAnchor,
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCheckbox,
        MatCell,
        MatCellDef,
        FormsModule,
        MatPaginator,
        MatHeaderRow,
        MatRow,
        MatHeaderRowDef,
        MatRowDef,
        MatIconButton,
        MatIconAnchor,
        MatListItemAvatar
    ]
})
export class RankingModule {
}
