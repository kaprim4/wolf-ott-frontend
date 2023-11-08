import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

// service
import {AuthenticationService} from 'src/app/core/service/auth.service';
import {ICredential} from "../../core/interfaces/credential";
import {TokenService} from "../../core/service/token.service";
import {IToken} from "../../core/interfaces/token";

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

    constructor(
        private authService: AuthenticationService,
        private tokenService: TokenService,
        private route: ActivatedRoute,
        private fb: FormBuilder) {
    }

    loginForm: FormGroup = this.fb.group({
        username: ['adminENELP', [Validators.required]],
        password: ['000000', Validators.required]
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
            this.authService.login(this.formValues['username'].value, this.formValues['password'].value).subscribe(
                (data: IToken) => {
                    console.log("login token:", data.token)
                    this.tokenService.saveToken(data.token)
                },
                (error: string) => {
                    this.error = error;
                    console.log(error)
                },
                ((): void => {
                    this.loading = false;
                })
            )
        }
    }
}
