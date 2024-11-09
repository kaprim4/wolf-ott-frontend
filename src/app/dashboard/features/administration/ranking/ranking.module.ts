import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RankingRoutingModule} from './ranking-routing.module';
import {RankListComponent} from "./rank-list/rank-list.component";
import { SharedModule } from 'src/app/shared/shared.module';
import { RankAddComponent } from './rank-add/rank-add.component';
import { RankViewComponent } from './rank-view/rank-view.component';


@NgModule({
    declarations: [
        RankListComponent,
        RankAddComponent,
        RankViewComponent
    ],
    imports: [
        CommonModule,
        RankingRoutingModule,
        SharedModule
    ]
})
export class RankingModule {
}
