import {Component} from '@angular/core';
import {CoreService} from 'src/app/services/core.service';
import {FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {MaterialModule} from '../../../material.module';
import {environment} from "../../../../environments/environment";
import {ICredential} from "../../../shared/models/credential";
import {TokenService} from "../../../shared/services/token.service";
import {AuthenticationService} from "../../../shared/services/auth.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-side-login',
    standalone: true,
    imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
    templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
    options = this.settings.getOptions();

    form: ICredential = {
        username: '',
        password: ''
    }

    currYear: number = new Date().getFullYear();
    today: Date = new Date();
    APP_NAME = environment.APP_NAME;

    constructor(
        private settings: CoreService,
        private authService: AuthenticationService,
        private tokenService: TokenService,
        private route: ActivatedRoute,
        private fb: FormBuilder) {
    }

    loginForm: FormGroup = this.fb.group({
        username: ['ghostspack', [Validators.required]],
        password: ['Blackhandler1020@@', Validators.required]
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
    }
}
