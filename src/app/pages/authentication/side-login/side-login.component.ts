import {Component, OnInit} from '@angular/core';
import {CoreService} from 'src/app/services/core.service';
import {FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {MaterialModule} from '../../../material.module';
import {environment} from "../../../../environments/environment";
import {ICredential} from "../../../shared/models/credential";
import {TokenService} from "../../../shared/services/token.service";
import {AuthenticationService} from "../../../shared/services/auth.service";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {ComponentClass} from "devextreme/core/dom_component";
import {SharedModule} from "../../../shared/shared.module";

@Component({
    selector: 'app-side-login',
    standalone: true,
    imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, SharedModule],
    templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent implements OnInit {
    protected apiBaseUrl = environment.apiBaseUrl;
    currYear: number = new Date().getFullYear();
    today: Date = new Date();
    APP_NAME = environment.APP_NAME;

    options = this.settings.getOptions();
    form: ICredential = {
        username: '',
        password: ''
    }

    captchaHandler = (captchaObj: any) => {
        (window as any).captchaObj = captchaObj;
        captchaObj.appendTo("#captcha")
            .onReady(function () {
                console.log("ready");
            })
            .onNextReady(function () {
                console.log("nextReady");
            })
            .onBoxShow(function () {
                console.log("boxShow");
            })
            .onError(function (e: any) {
                console.log(e);
            })
            .onSuccess(() => {
                if (this.captchaConfig.config.product === "bind") {
                    this.validate();
                }
            });
    }
    captchaConfig = {
        config: {
            captchaId: "3474b7f80d5f0cdcefcc27778bed5ff2",
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
        private httpClient: HttpClient
    ) {
    }

    loginForm: FormGroup = this.fb.group({
        username: ['ghostspack', [Validators.required, Validators.minLength(6)]],
        password: ['Blackhandler1020@@', [Validators.required]]
    });
    formSubmitted: boolean = false;
    error: string = '';
    returnUrl: string = '/';
    loading: boolean = false;

    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.returnUrl;
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
            captcha_id: this.captchaConfig.config.captchaId,
        });
        this.httpClient.get(`${this.apiBaseUrl}/api/v1/auth/validate`, params)
            .subscribe((res: any) => {
                if (res.data.result) {
                    console.log(res.data);
                    alert(res.data.result);

                    this.authService.login(this.formValues['username'].value, this.formValues['password'].value)?.subscribe(
                        (data: HttpResponse<any>) => {
                            if (data.status === 200 || data.status === 202) {
                                console.log(`Got a successfull status code: ${data.status}`);
                            }
                            if (data.body) {
                                console.log("login token:", data.body.access_token)
                                this.tokenService.saveToken(data.body.access_token)
                            }
                            console.log('This contains body: ', data.body);
                        },
                        (err: HttpErrorResponse) => {
                            if (err.status === 403 || err.status === 404) {
                                console.error(`${err.status} status code caught`);
                                this.error = err.message;
                                console.log(err.message)
                            }
                        }, ((): void => {
                            this.loading = false;
                        })
                    )
                }
            });
    }
}
