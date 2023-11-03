import {Component, OnInit} from '@angular/core';

// utility
import {changeBodyAttribute, getLayoutConfig} from '../shared/helper/utils';

// types
import {LayoutConfig} from '../shared/models/layout-config.model';
import {LayoutColor} from '../shared/config/layout.model';

@Component({
    selector: 'app-public-layout',
    templateUrl: './public-layout.component.html',
    styleUrls: ['./public-layout.component.scss']
})
export class PublicLayoutComponent implements OnInit {

    layoutConfig!: LayoutConfig;
    layoutColor!: LayoutColor;

    constructor() {
    }

    ngOnInit(): void {
        this.setLayoutConfig();
    }

    /**
     * set layout config
     */
    setLayoutConfig(): void {
        this.layoutConfig = getLayoutConfig();
        this.layoutColor = this.layoutConfig.layoutColor;
        // light vs dark mode
        changeBodyAttribute('data-layout-color', this.layoutColor);
    }


}
