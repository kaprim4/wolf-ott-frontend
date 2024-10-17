import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { IUser, UserDetail, UserList } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs';

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
    public dialog: MatDialog
  ) {
    this.user.id = 0;
    this.addForm = this.fb.group({});
    this.ownerSearchCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOwners(value))
  ).subscribe(filtered => {
      this.filteredOwners = filtered;
  });
  }
  ngOnInit(): void {
    this.userService.getAllUsers<UserList>().subscribe((users: UserList[]) => {
        this.owners = users;
        this.filteredOwners = this.owners;
        console.log("Selected Owner", this.selectedOwner);
        
    });

  }

  saveDetail(): void {
    this.user.ownerId = this.selectedOwner.id;
    console.log("Save User", this.user);
    // this.dialog.open(UserDialogComponent);
    // this.userService.addUser(this.user);
    // this.router.navigate(['/apps/users']);

    
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
