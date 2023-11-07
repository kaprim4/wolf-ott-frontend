import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs';

// service
import {AuthenticationService} from 'src/app/core/service/auth.service';
import {AuthUser} from "../../core/models/auth.models";

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
            this.authenticationService.signup(this.formValues['name'].value, this.formValues['email'].value, this.formValues['password'].value)
                .pipe(first())
                .subscribe(
                    (data: AuthUser) => {
                        // navigates to confirm mail screen
                        this.router.navigate(['/auth/confirm-mail']);
                    },
                    (error: string) => {
                        this.error = error;
                        this.loading = false;
                    });
        }
    }


}
