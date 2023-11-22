import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
// service
import {AuthenticationService} from 'src/app/core/service/auth.service';
import {IUser} from "../../core/interfaces/user";
import {TokenService} from "../../core/service/token.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {GasStation} from "../../core/interfaces/gas_station";
// types


@Component({
    selector: 'app-auth-lock-screen',
    templateUrl: './lock-screen.component.html',
    styleUrls: ['./lock-screen.component.scss']
})
export class LockScreenComponent implements OnInit {

    lockScreenForm!: FormGroup;
    formSubmitted: boolean = false;
    error: string = '';

    constructor(
        private router: Router,
        private authService: AuthenticationService,
        private tokenService: TokenService,
        private fb: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        this.lockScreenForm = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(4)]]
        });
    }

    get formValues() {
        return this.lockScreenForm.controls;
    }

    onSubmit(): void {
        this.formSubmitted = true;
        if (this.lockScreenForm.valid) {
            let username = this.tokenService.getPayload().username;
            let password = this.formValues['password'].value;
            this.authService.login(username, password).subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        console.log(`Got a successfull status code: ${data.status}`);
                    }
                    if (data.body) {
                        this.tokenService.saveToken(data.body.token)
                    }
                    console.log('This contains body: ', data.body);
                },
                (err: HttpErrorResponse) => {
                    if (err.status === 403 || err.status === 404) {
                        console.error(`${err.status} status code caught`);
                        this.error = err.message;
                        console.log(err.message)
                    }
                }
            )
        }
    }

}
