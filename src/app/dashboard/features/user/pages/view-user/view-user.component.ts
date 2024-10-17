import {Component, OnInit} from '@angular/core';
import {FormControl, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {UserDialogComponent} from '../user-dialog/user-dialog.component';
import {UserService} from 'src/app/shared/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {IUser, UserDetail, UserList} from "../../../../../shared/models/user";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs';

@Component({
    selector: 'app-view-user',
    templateUrl: './view-user.component.html',
    styleUrl: './view-user.component.scss'
})
export class ViewUserComponent implements OnInit {
    id: number;
    financialMetrics: any[] = [
        {
            color: 'primary',
            icon: 'account_balance', // Represents total credits
            title: '0',
            subtitle: 'Total Credits',
        },
        {
            color: 'warning',
            icon: 'shopping_cart', // Represents purchase cost
            title: '0',
            subtitle: 'Purchase Cost',
        },
        {
            color: 'accent',
            icon: 'wallet', // Represents remaining credits
            title: '0',
            subtitle: 'Remaining Credits',
        },
    ];


    userForm: UntypedFormGroup | any = {};
    rows: UntypedFormArray;
    user: UserDetail = {id: 0, username: ''};

    owners: UserList[] = [];
    filteredOwners: UserList[] = [];
    // selectedOwner: IUser;
    ownerSearchTerm = '';
    dropdownOpened = false;
    addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    ownerSearchCtrl = new FormControl();


    constructor(
        private fb: UntypedFormBuilder,
        private userService: UserService,
        private router: Router,
        public dialog: MatDialog,
        private activatedRouter: ActivatedRoute
    ) {
        this.id = this.activatedRouter.snapshot.paramMap.get(
            'id'
        ) as unknown as number;
        this.initializeForm({id: this.id, username: ''})

        this.ownerSearchCtrl.valueChanges.pipe(
            startWith(''),
            map(value => this.filterOwners(value))
        ).subscribe(filtered => {
            this.filteredOwners = filtered;
        });
    }

    ngOnInit(): void {
        this.userService.getUser<UserDetail>(this.id).subscribe(user => {
            this.user = user;
            this.initializeForm(user);
        });

        this.userService.getAllUsers<UserList>().subscribe((users: UserList[]) => {
            this.owners = users;
            this.filteredOwners = this.owners;
            console.log("Selected Owner", this.selectedOwner);
            
        });
    }

    initializeForm(user: UserDetail): void {
        this.userForm = this.fb.group({
            username: [user.username || '', Validators.required],
            email: [user.email || '', Validators.required], // Fix typo: eamil -> email
            password: [user.password || '', Validators.required],
            ownerId: [user.ownerId || '', Validators.required],
            resellerDns: [user.resellerDns || '', Validators.required],
            notes: [user.notes || '', Validators.required],
            duration: [0, Validators.required],
            rows: this.fb.array([]) // Initialize rows here
        });

    }

    saveDetail(): void {
        // this.dialog.open(UserDialogComponent);
        this.user.id = this.id
        this.userService.updateUser(this.user);
        this.router.navigate(['/apps/users']);
    }

    private filterOwners(value: string): any[] {
        const filterValue = value?.toLowerCase();
        return this.owners.filter(owner => owner?.username?.toLowerCase().includes(filterValue));
    }

    ownersFilterOptions() {
        const searchTermLower = this.ownerSearchTerm.toLowerCase();
        this.filteredOwners = this.owners.filter((owner) =>
            owner?.username?.toLowerCase().includes(searchTermLower)
        );
      }
      
      onOwnersDropdownOpened(opened: boolean) {
        this.dropdownOpened = opened;
        if (opened) {
            // Reset search term and filter options when the dropdown opens
            this.ownerSearchTerm = '';
            this.ownersFilterOptions();
        }
      }
      
      get selectedOwner():IUser {
        return this.owners.find(owner => owner.id == this.user.ownerId) as IUser;
      }
}
