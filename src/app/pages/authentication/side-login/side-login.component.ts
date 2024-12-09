import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {CoreService} from 'src/app/services/core.service';
import {FormGroup, Validators, FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {MaterialModule} from '../../../material.module';
import {environment} from "../../../../environments/environment";
import {ICredential} from "../../../shared/models/credential";
import {TokenService} from "../../../shared/services/token.service";
import {AuthenticationService} from "../../../shared/services/auth.service";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {SharedModule} from "../../../shared/shared.module";
import {UserService} from "../../../shared/services/user.service";
import {AppSettings} from "../../../config";
import {IUserThemeOptions, IUserThemeOptionsRequest} from "../../../shared/models/user";
import {NotificationService} from "../../../shared/services/notification.service";
import {LoggingService} from "../../../services/logging.service";

@Component({
    selector: 'app-side-login',
    standalone: true,
    imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, SharedModule],
    templateUrl: './side-login.component.html',
    styleUrl: './side-login.component.scss'
})
export class AppSideLoginComponent implements OnInit, AfterViewInit {
    @ViewChild('backgroundVideo') backgroundVideo!: ElementRef<HTMLVideoElement>;
    @Output() optionsChange = new EventEmitter<AppSettings>();
    protected apiBaseUrl = environment.apiBaseUrl;
    currYear: number = new Date().getFullYear();
    today: Date = new Date();
    APP_NAME = environment.APP_NAME;

    options = this.settings.getOptions();

    form: ICredential = {
        username: '',
        password: ''
    }

    userThemeOptionsRequest: IUserThemeOptionsRequest = {
        activeTheme: "", language: "", theme: "", userId: 0
    }

    userThemeOptions: IUserThemeOptions = {
        id: 0, activeTheme: "", language: "", theme: "", userId: 0
    }

    captchaHandler = (captchaObj: any) => {
        (window as any).captchaObj = captchaObj;
        captchaObj.appendTo("#captcha")
            .onReady(function (loggingService: LoggingService) {
                loggingService.log("ready");
            })
            .onNextReady(function (loggingService: LoggingService) {
                loggingService.log("nextReady");
            })
            .onBoxShow(function (loggingService: LoggingService) {
                loggingService.log("boxShow");
            })
            .onError(function (loggingService: LoggingService, e: any) {
                loggingService.log(e);
            })
            .onSuccess(() => {
                if (this.captchaConfig.config.product === "bind") {
                    this.validate();
                }
            });
    }

    captchaConfig = {
        config: {
            captchaId: "6f1196717598a32c3f8e9b71c03b5782",
            language: "en",
            product: "bind",
        },
        handler: this.captchaHandler,
    };

    constructor(
        private settings: CoreService,
        private authService: AuthenticationService,
        private tokenService: TokenService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private httpClient: HttpClient,
        private userService: UserService,
        protected notificationService: NotificationService,
        private loggingService: LoggingService
    ) {
    }

    loginForm: FormGroup = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(6)]],
        password: ['', [Validators.required]]
    });
    formSubmitted: boolean = false;
    error: string = '';
    returnUrl: string = '/';
    loading: boolean = false;

    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.returnUrl;
    }

    ngAfterViewInit(): void {
        const videoElement = this.backgroundVideo.nativeElement;

        videoElement.muted = true; // Obligation pour Safari
        videoElement.playsInline = true; // Important pour éviter le plein écran sur iOS

        videoElement.play().catch((err) => {
            this.loggingService.error('Erreur de lecture vidéo sur Safari:', err);
        });
    }

    get formValues() {
        return this.loginForm.controls;
    }

    onSubmit(): void {
        this.formSubmitted = true;
        if (this.loginForm.valid) {
            this.loading = true;
            if (this.captchaConfig.config.product === "bind") {
                if ((window as any).captchaObj) {
                    (window as any).captchaObj.showCaptcha();
                } else {
                    alert("Please wait for verification initialization to complete");
                    this.loading = false;
                    // return false;
                }
            } else {
                this.validate();
            }
        }
    }

    validate() {
        var result = (window as any).captchaObj.getValidate();
        if (!result) {
            alert("Please complete verification first!");
            this.loading = false;
            return;
        }
        const params = Object.assign(result, {
            captcha_id: this.captchaConfig.config.captchaId
        });
        this.loggingService.log("captchaObj params", params);
        this.httpClient.get(`${this.apiBaseUrl}/api/v1/auth/validate`, {params}).subscribe((result: any) => {
            this.loggingService.log("result: ", result);
            if (result.result) {
                this.authService.login(this.formValues['username'].value, this.formValues['password'].value)?.subscribe(
                    (data: HttpResponse<any>) => {
                        if (data.status === 200 || data.status === 202) {
                            this.loggingService.log(`Got a successfull status code: ${data.status}`);
                        }
                        if (data.body) {
                            this.loggingService.log("login token:", data.body.access_token)
                            this.tokenService.saveToken(data.body.access_token)
                            this.getUserThemeConfig()
                        }
                        this.loggingService.log('This contains body: ', data.body);
                    },
                    (err: HttpErrorResponse) => {
                        if (err.status === 403 || err.status === 404) {
                            this.loggingService.error(`${err.status} status code caught`);
                            this.error = err.message;
                            this.loggingService.log(err.message)
                        }
                    }, ((): void => {
                        this.loading = false;
                    })
                )
            }
        });
    }

    getUserThemeConfig() {
        this.userThemeOptionsRequest = {
            activeTheme: this.options.activeTheme,
            language: this.options.language,
            theme: this.options.theme,
            userId: parseInt(this.tokenService.getPayload().sid)
        };

        this.loggingService.log("options:", this.options);
        this.loggingService.log("userThemeOptionsRequest:", this.userThemeOptionsRequest);

        this.userService.createUserThemeOptions(this.userThemeOptionsRequest).subscribe({
            next: (value) => {
                if (value.status === 200 && value.body) {
                    this.userThemeOptions = value.body;
                    this.loggingService.log(this.userThemeOptions);
                    this.options = {
                        activeTheme: value.body.activeTheme,
                        boxed: false,
                        cardBorder: false,
                        dir: "ltr",
                        horizontal: false,
                        language: value.body.language,
                        navPos: "side",
                        sidenavCollapsed: false,
                        sidenavOpened: false,
                        theme: value.body.theme
                    }
                    this.loggingService.info("this.options after create: {}", this.options);
                }
            },
            error: (err) => {
                // Handle error (show notification or alert)
                this.notificationService.error('Error while creating user theme options');
                this.loggingService.error("'Error while creating user theme options'", err);
            },
            complete: () => {
                this.optionsChange.emit(this.options);
                this.notificationService.success('User\'s theme options was successfully created');
            }
        })
    }
}
