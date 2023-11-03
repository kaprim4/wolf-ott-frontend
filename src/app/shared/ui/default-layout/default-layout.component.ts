import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-default-layout',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

    @Input() hasLogo?: boolean = true;
    @Input() cardClass?: string = '';

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        document.body.classList.add('authentication-bg', 'authentication-bg-pattern');
    }

    ngOnDestroy(): void {
        document.body.classList.remove('authentication-bg', 'authentication-bg-pattern');
    }

}
