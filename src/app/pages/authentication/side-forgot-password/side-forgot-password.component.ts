import {Component, OnInit} from '@angular/core';
import {CoreService} from 'src/app/services/core.service';
import {FormGroup, Validators, FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {MaterialModule} from '../../../material.module';
import {AuthenticationService} from "../../../shared/services/auth.service";
import {TokenService} from "../../../shared/services/token.service";
import {environment} from "../../../../environments/environment";
import {LoggingService} from "../../../services/logging.service";

@Component({
    selector: 'app-side-forgot-password',
    standalone: true,
    imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
    templateUrl: './side-forgot-password.component.html',
})
export class AppSideForgotPasswordComponent implements OnInit {
    options = this.settings.getOptions();

    currYear: number = new Date().getFullYear();
    today: Date = new Date();
    APP_NAME = environment.APP_NAME;

    constructor(
        private settings: CoreService,
        private authService: AuthenticationService,
        private tokenService: TokenService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private loggingService: LoggingService
    ) {
    }


    forgotPasswordForm: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]]
    });

    formSubmitted: boolean = false;
    error: string = '';
    returnUrl: string = '/';
    loading: boolean = false;


    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.returnUrl;
    }

    get formValues() {
        return this.forgotPasswordForm.controls;
    }

    onSubmit(): void {
        this.formSubmitted = true;
        if (this.forgotPasswordForm.valid) {
            this.loading = true;
            this.router.navigate(['/auth/login']).then(r =>
                this.loggingService.log("Forgot Password Form.")
            )
        }
    }
}
