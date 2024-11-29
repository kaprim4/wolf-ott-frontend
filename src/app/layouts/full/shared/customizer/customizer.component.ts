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
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {UserService} from "../../../../shared/services/user.service";
import {IUserThemeOptionsRequest, UserDetail} from "../../../../shared/models/user";
import {TokenService} from "../../../../shared/services/token.service";
import {NotificationService} from "../../../../shared/services/notification.service";

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
        activeTheme: "", language: "", theme: "", userId: 0
    }
    loggedInUser: any;
    user: any;

    constructor(
        private settings: CoreService,
        private userService: UserService,
        private tokenService: TokenService,
        protected notificationService: NotificationService,
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
            userId: this.user.id
        };
        this.userService.updateUserThemeOptions(this.user.id, this.userThemeOptionsRequest).subscribe({
            next: (value) => {
                if(value.status === 200 && value.body) {
                    this.options = {
                        dir: 'ltr',
                        theme: value.body.theme,
                        sidenavOpened: true,
                        sidenavCollapsed: false,
                        boxed: false,
                        horizontal: false,
                        cardBorder: false,
                        activeTheme:  value.body.activeTheme,
                        language:  value.body.language,
                        navPos: 'side',
                    }
                    console.info("this.options after update: {}", this.options);
                }
            },
            error: (err) => {
                // Handle error (show notification or alert)
                this.notificationService.error('Error while saving user theme options');
                console.error("'Error while saving user theme options'", err);
            },
            complete:()=>{
                this.optionsChange.emit(this.options);
                this.notificationService.success('User\'s theme options was successfully updated');
            }
        });
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
