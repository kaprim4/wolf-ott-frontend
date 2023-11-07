import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs';

// service
import {AuthenticationService} from 'src/app/core/service/auth.service';

// types
import {AuthUser} from "../../core/models/auth.models";

@Component({
    selector: 'app-auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private fb: FormBuilder) {
    }

    loginForm: FormGroup = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', Validators.required]
    });
    formSubmitted: boolean = false;
    error: string = '';
    returnUrl: string = '/';
    loading: boolean = false;

    users: AuthUser[] = [];
    loggedUser:AuthUser | null = null;


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
            // @ts-ignore
            this.authenticationService.login(this.formValues['username'].value, this.formValues['password'].value).pipe(first())
                .subscribe(
                    (data: AuthUser) => {
                        if(data.token)
                            this.router.navigate([this.returnUrl]);
                    },
                    (error: string) => {
                        this.error = error;
                        this.loading = false;
                    });
        }
    }
}
