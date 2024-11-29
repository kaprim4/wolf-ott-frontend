import {Component, OnInit} from '@angular/core';
import {FormControl, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {UserDialogComponent} from '../user-dialog/user-dialog.component';
import {UserService} from 'src/app/shared/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {IUser, UserDetail, UserList} from "../../../../../shared/models/user";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs';
import { TokenService } from 'src/app/shared/services/token.service';
import { GroupList } from 'src/app/shared/models/group';
import { GroupService } from 'src/app/shared/services/group.service';

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
    groups:GroupList[] = [];

    principal: any;

    owners: UserList[] = [];
    filteredOwners: UserList[] = [];
    filteredGroups: GroupList[] = [];
    // selectedOwner: IUser;
    ownerSearchTerm = '';
    groupSearchTerm = '';
    dropdownOpened = false;
    addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    ownerSearchCtrl = new FormControl();
    groupSearchCtrl = new FormControl();

    userLoading: boolean;
    ownersLoading: boolean;

    constructor(
        private fb: UntypedFormBuilder,
        private userService: UserService,
        private groupService: GroupService,
        private router: Router,
        public dialog: MatDialog,
        private activatedRouter: ActivatedRoute,
        private tokenService: TokenService
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
        this.groupSearchCtrl.valueChanges.pipe(
            startWith(''),
            map(value => this.filterGroups(value))
        ).subscribe(filtered => {
            this.filteredGroups = filtered as GroupList[];
        });

        this.principal = this.tokenService.getPayload();
    }

    ngOnInit(): void {
        this.userLoading = true;
        this.userService.getUser<UserDetail>(this.id).subscribe(user => {
            this.user = user;
            this.initializeForm(user);
            this.userLoading = false;
        });

        this.ownersLoading = true;
        this.userService.getAllUsers<UserList>().subscribe((users: UserList[]) => {
            this.owners = users;
            this.filteredOwners = this.owners;
            console.log("Selected Owner", this.selectedOwner);
            this.ownersLoading = false;
        });

        this.groupService.getAllGroups<GroupList>().subscribe(groups => {
            this.groups = groups;
          })
    }

    initializeForm(user: UserDetail): void {
        this.userForm = this.fb.group({
            username: [user.username || '', Validators.required],
            email: [user.email || '', Validators.required], // Fix typo: eamil -> email
            password: [user.password || ''],
            ownerId: [user.ownerId || ''],
            groupId: [user.groupId || ''],
            resellerDns: [user.resellerDns || ''],
            notes: [user.notes || ''],
            duration: [0],
            rows: this.fb.array([]) // Initialize rows here
        });

    }

    saveDetail(): void {
        // this.dialog.open(UserDialogComponent);
        this.user.id = this.id
        this.userService.updateUser(this.user).subscribe((user) => {
            console.log("Saved User:", user);
            this.router.navigate(['/apps/users']);
        });
        
    }

    private filterOwners(value: string): any[] {
        const filterValue = value?.toLowerCase();
        return this.owners.filter(owner => owner?.username?.toLowerCase().includes(filterValue));
    }
    private filterGroups(value: string): GroupList[] {
        const filterValue = value?.toLowerCase();
        return this.groups.filter(group => group?.groupName?.toLowerCase().includes(filterValue));
      }
      

    ownersFilterOptions() {
        const searchTermLower = this.ownerSearchTerm.toLowerCase();
        this.filteredOwners = this.owners.filter((owner) =>
            owner?.username?.toLowerCase().includes(searchTermLower)
        );
      }

      groupsFilterOptions() {
        const searchTermLower = this.groupSearchTerm.toLowerCase();
        // this.filterGroups = this.groups.filter((group) =>group?.groupName?.toLowerCase().includes(searchTermLower));
      }
      
      onOwnersDropdownOpened(opened: boolean) {
        this.dropdownOpened = opened;
        if (opened) {
            // Reset search term and filter options when the dropdown opens
            this.ownerSearchTerm = '';
            this.ownersFilterOptions();
        }
      }

      onGroupsDropdownOpened(opened: boolean) {
        this.dropdownOpened = opened;
        if (opened) {
            // Reset search term and filter options when the dropdown opens
            this.groupSearchTerm = '';
            this.groupsFilterOptions();
        }
      }
      
      get selectedOwner():IUser {
        return this.owners.find(owner => owner.id == this.user.ownerId) as IUser;
      }

      get selectedGroup():GroupList {
        return this.groups.find(group => group.groupId == this.user.groupId) as GroupList;
      }

      get loading():boolean{
        return this.userLoading || this.ownersLoading;
      }

      get isAdmin() {
        return !!this.principal?.isAdmin;
      }
}
