import {Component, OnInit} from '@angular/core';
import {UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {UserDetail} from "../../../../../shared/models/user";
import {UserService} from "../../../../../shared/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TokenService} from "../../../../../shared/services/token.service";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

    loggedInUser: any;
    userForm: UntypedFormGroup | any = {};
    rows: UntypedFormArray;
    user: UserDetail = {
        email: "",
        id: 0,
        resellerDns: "",
        thumbnail: "",
        timezone: "",
        username: ""
    };
    userLoading: boolean;
    imagePreview: string | ArrayBuffer | null = null;

    constructor(
        private fb: UntypedFormBuilder,
        private userService: UserService,
        private router: Router,
        public dialog: MatDialog,
        private tokenService: TokenService,
    ) {
        this.initializeForm(this.user)
    }

    ngOnInit(): void {
        this.userLoading = true;
        this.loggedInUser = this.tokenService.getPayload();
        this.userService.getUser<UserDetail>(this.loggedInUser.sid).subscribe(user => {
            this.user = {
                email: user.email,
                id: user.id,
                resellerDns:user.resellerDns,
                thumbnail: user.thumbnail,
                timezone: user.timezone,
                username: user.username
            };
            this.initializeForm(user);
            this.userLoading = false;
            console.log(this.user)
        });
    }

    onFileSelected(event: Event): void {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result;
                this.user.thumbnail = reader.result as string; // Stocke l'image en base64
            };
            reader.readAsDataURL(file);
        }
    }

    initializeForm(user: UserDetail): void {
        this.userForm = this.fb.group({
            username: [user.username || '', Validators.required],
            email: [user.email || '', Validators.required], // Fix typo: eamil -> email
            timezone: [user.timezone || ''],
            //current_password: [''],
            //new_password: [''],
            //confirm_password: [''],
            resellerDns: [user.resellerDns || ''],
            rows: this.fb.array([]) // Initialize rows here
        });
    }

    saveDetail(): void {
        console.log("saveDetail clicked")
        /*if(this.fb.control("current_password").value !== ""){

        }*/
        this.userService.updateUser(this.user);
        this.router.navigate(['/apps/users/profile']);
    }

    get loading(): boolean {
        return this.userLoading;
    }
}
