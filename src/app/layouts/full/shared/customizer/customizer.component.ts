import {
    Component,
    Output,
    EventEmitter,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    signal, OnInit
} from '@angular/core';
import {AppSettings} from 'src/app/config';
import {CoreService} from 'src/app/services/core.service';
import {BrandingComponent} from '../../vertical/sidebar/branding.component';
import {TablerIconsModule} from 'angular-tabler-icons';
import {MaterialModule} from 'src/app/material.module';
import {CommonModule, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {ParameterService} from "../../../../shared/services/parameters.service";
import {UserService} from "../../../../shared/services/user.service";
import {IUserThemeOptionsRequest, UserDetail} from "../../../../shared/models/user";
import {TokenService} from "../../../../shared/services/token.service";

@Component({
    selector: 'app-customizer',
    standalone: true,
    imports: [
        BrandingComponent,
        TablerIconsModule,
        MaterialModule,
        FormsModule,
        NgScrollbarModule,
        NgIf,
    ],
    templateUrl: './customizer.component.html',
    styleUrls: ['./customizer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizerComponent implements OnInit {
    @Output() optionsChange = new EventEmitter<AppSettings>();
    hideSingleSelectionIndicator = signal(true);
    hideMultipleSelectionIndicator = signal(true);

    userThemeOptionsRequest: IUserThemeOptionsRequest = {
        activeTheme: "", language: "", theme: "", user_id: 0
    }
    loggedInUser: any;
    user: any;

    constructor(
        private settings: CoreService,
        private userService: UserService,
        private tokenService: TokenService,
    ) {
    }

    ngOnInit() {
        this.loggedInUser = this.tokenService.getPayload();
        this.userService.getUser<UserDetail>(this.loggedInUser.sid).subscribe((user) => {
            this.user = user;
        });
    }

    options = this.settings.getOptions();

    updateUserThemeConfig(options: AppSettings) {
        this.userThemeOptionsRequest = {
            activeTheme: options.activeTheme,
            language: options.language,
            theme: options.theme,
            user_id: this.user.id
        };
        this.userService.updateUserThemeOptions(this.userThemeOptionsRequest);
    }

    setDark() {
        this.optionsChange.emit(this.options);
        console.log(this.options);
        this.updateUserThemeConfig(this.options);
    }

    setColor() {
        this.optionsChange.emit(this.options);
        console.log(this.options);
        this.updateUserThemeConfig(this.options);
    }
}
