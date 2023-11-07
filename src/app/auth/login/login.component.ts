import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs';

// service
import {AuthenticationService} from 'src/app/core/service/auth.service';
import {IUser} from "../../core/interfaces/user";
import {ICredential} from "../../core/interfaces/credential";
import {TokenService} from "../../core/service/token.service";

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
        username: ['root', [Validators.required]],
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
                data => {
                    console.log("login token:", data.token)
                    this.tokenService.saveToken(data.token)
                },
                (error: string) => {
                    this.error = error;
                    this.loading = false;
                    console.log(error)
                }
            )
        }
    }
}
