import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs';

// service
import {AuthenticationService} from 'src/app/core/service/auth.service';
import {IUser} from "../../core/interfaces/user";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {VoucherTemp} from "../../core/interfaces/voucher";

// types

@Component({
    selector: 'app-auth-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    signUpForm: FormGroup = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });

    formSubmitted: boolean = false;
    showPassword: boolean = false;
    loading: boolean = false;
    error: string = '';

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
    ) {
    }

    ngOnInit(): void {
    }

    /**
     * convenience getter for easy access to form fields
     */
    get formValues() {
        return this.signUpForm.controls;
    }


    /**
     * On form submit
     */
    onSubmit(): void {
        this.formSubmitted = true;

        if (this.signUpForm.valid) {
            this.loading = true;
            let name = this.formValues['name'].value;
            let email = this.formValues['email'].value;
            let password = this.formValues['password'].value;
            this.authenticationService.signup(name, email, password).pipe(first()).subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        console.log(`Got a successfull status code: ${data.status}`);
                    }
                    if (data.body) {
                        // navigates to confirm mail screen
                        this.router.navigate(['/auth/confirm-mail']);
                    }
                    console.log('This contains body: ', data.body);
                },
                (err: HttpErrorResponse) => {
                    if (err.status === 403 || err.status === 404) {
                        console.error(`${err.status} status code caught`);
                        this.error = err.message;
                        this.loading = false;
                    }
                }
            );
        }
    }


}
