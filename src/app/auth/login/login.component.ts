import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

// service
import {AuthenticationService} from 'src/app/core/service/auth.service';
import {ICredential} from "../../core/interfaces/credential";
import {TokenService} from "../../core/service/token.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";

// types

@Component({
    selector: 'app-auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    form: ICredential = {
        username: '',
        password: ''
    }

    currYear: number = new Date().getFullYear();
    today: Date = new Date();
    APP_NAME = environment.APP_NAME;

    constructor(
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
