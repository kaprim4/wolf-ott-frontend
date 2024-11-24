import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { IUser, UserDetail, UserList } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs';
import { GroupService } from 'src/app/shared/services/group.service';
import { GroupList, IGroup } from 'src/app/shared/models/group';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {

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
  
  
  addForm: UntypedFormGroup | any;
  rows: UntypedFormArray;
  user: UserDetail  = { id: 0, username: ''};
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

  constructor(
    private fb: UntypedFormBuilder,
    private userService: UserService,
    private groupService: GroupService,
    private router: Router,
    private dialog: MatDialog,
    private tokenService: TokenService
  ) {
    this.user.id = 0;
    this.addForm = this.fb.group({});
    this.ownerSearchCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOwners(value))
  ).subscribe(filtered => {
      this.filteredOwners = filtered as UserList[];
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
    this.userService.getAllUsers<UserList>().subscribe((users: UserList[]) => {
        this.owners = users;
        this.filteredOwners = this.owners;
        console.log("Selected Owner", this.selectedOwner);
        
    });

    this.groupService.getAllGroups<GroupList>().subscribe(groups => {
      this.groups = groups;
    })

  }

  saveDetail(): void {
    this.user.ownerId = this.selectedOwner.id;
    console.log("Save User", this.user);
    // this.dialog.open(UserDialogComponent);
    // this.userService.addUser(this.user);
    // this.router.navigate(['/apps/users']);

    
  }

  private filterOwners(value: string): IUser[] {
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

get isAdmin() {
  return !!this.principal?.isAdmin;
}
}
