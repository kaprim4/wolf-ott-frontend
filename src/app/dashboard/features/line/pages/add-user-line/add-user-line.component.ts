import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { order } from 'src/app/pages/apps/invoice/invoice';
import { UserDialogComponent } from '../../../user/pages/user-dialog/user-dialog.component';
import { LineService } from 'src/app/shared/services/line.service';
import { LineDetail } from 'src/app/shared/models/line';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { map, Observable, startWith } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { PackageService } from 'src/app/shared/services/package.service';
import { BouquetService } from 'src/app/shared/services/bouquet.service';
import { LineFactory } from 'src/app/shared/factories/line.factory';
import { IUser, UserList } from 'src/app/shared/models/user';
import { IPackage, PackageList } from 'src/app/shared/models/package';
import { BouquetList, IBouquet } from 'src/app/shared/models/bouquet';

@Component({
  selector: 'app-add-user-line',
  templateUrl: './add-user-line.component.html',
  styleUrls: ['./add-user-line.component.scss']
})
export class AddUserLineComponent implements OnInit {
  
  addForm: UntypedFormGroup;
  line: LineDetail;

  bouquetsDataSource: MatTableDataSource<BouquetList> = new MatTableDataSource<BouquetList>([]);
  bouquetsSelection: SelectionModel<IBouquet> = new SelectionModel<IBouquet>(true, []);

  owners:UserList[] = []; // Populate this with your actual data [{id: 1, name: 'Owner 1'}, ...]
  filteredOwners:any = [];
  ownerSearchTerm = '';
  selectedOwner: UserList;
  dropdownOpened = false;
  packages:PackageList[] = []; // Populate this with your actual data [{id: 1, name: 'Owner 1'}, ...]
  packageSearchTerm = '';
  filteredPackages:any = [];
  selectedPackage: PackageList;

  bouquets: BouquetList[] = [];


  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

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

  constructor(
    private fb: UntypedFormBuilder,
    private lineService: LineService,
    private userService: UserService,
    private packageService: PackageService,
    private bouquetService: BouquetService,
    private router: Router,
    public dialog: MatDialog
  ) {
    // Initialize the line object
    this.line = LineFactory.initLineDetail();

    this.addForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      owner: ['', Validators.required],
      package: ['', Validators.required],
      packageCost: [null, Validators.required],
      duration: ['', Validators.required],
      maxConnections: [1, Validators.required],
      expirationDate: ['', Validators.required],
      contact: ['', [Validators.required, Validators.email]],
      resellerNotes: ['']
    });
  }
  ngOnInit(): void {
    // first option
    this.filteredOptions = this.firstControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    // Initialize owners (this could be fetched from a service)
    this.userService.getAllUsers<UserList>().subscribe(users => {
      this.owners = users;
      // Initially show all owners
      this.filteredOwners = this.owners;
    })

    this.packageService.getAllPackages<PackageList>().subscribe(packages => {
      this.packages = packages;
      this.filteredPackages = this.packages;
    });
     
    this.bouquetService.getAllBouquets<BouquetList>().subscribe(bouquets => {
      this.bouquets = bouquets;
      this.bouquetsDataSource = new MatTableDataSource<BouquetList>(this.bouquets);
      const lineBouquets: any[] = JSON.parse(this.line.bouquet).array;
      const packageBouquets: IBouquet[] = lineBouquets.map(id => this.bouquets.find(bouquet => bouquet.id = id) || {id: 0});
      this.bouquetsSelection = new SelectionModel<IBouquet>(true, packageBouquets);
    });

    
  
  }


  onOwnersDropdownOpened(opened: boolean) {
    this.dropdownOpened = opened;
    if (opened) {
        // Reset search term and filter options when the dropdown opens
        this.ownerSearchTerm = '';
        this.ownersFilterOptions();
    }
}

  ownersFilterOptions() {
    const searchTermLower = this.ownerSearchTerm.toLowerCase();
    this.filteredOwners = this.owners.filter((owner:UserList) => 
      owner.username.toLowerCase().includes(searchTermLower)
    );
  }

  onPackagesDropdownOpened(opened: boolean) {
    this.dropdownOpened = opened;
    if (opened) {
        // Reset search term and filter options when the dropdown opens
        this.packageSearchTerm = '';
        this.packagesFilterOptions();
    }
}

  packagesFilterOptions() {
    const searchTermLower = this.packageSearchTerm.toLowerCase();
    this.filteredPackages = this.packages.filter((pkg:PackageList) => 
      pkg.packageName.toLowerCase().includes(searchTermLower)
    );
  }

  onOwnerSelected(owner:any) {
    this.addForm.patchValue({
      owner: owner.id // Store the selected owner's ID
    });
  }

  allowedIps: any[] = [{ name: '127.0.0.1' }, { name: '192.168.1.1' }, { name: '255.255.255.0' }];
  allowedAgents: any[] = [{ name: 'Mozilla' }, { name: 'Chrome' }, { name: 'Edge' }];

  addAllowedIp(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.allowedIps.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeAllowedIp(ip: string): void {
    const index = this.allowedIps.indexOf(ip);

    if (index >= 0) {
      this.allowedIps.splice(index, 1);
    }
  }

  editAllowedIp(ip: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.removeAllowedIp(ip);
      return;
    }

    // Edit existing fruit
    const index = this.allowedIps.indexOf(ip);
    if (index >= 0) {
      this.allowedIps[index].name = value;
    }
  }

  addAllowedAgent(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.allowedIps.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeAllowedAgent(agent: string): void {
    const index = this.allowedAgents.indexOf(agent);

    if (index >= 0) {
      this.allowedAgents.splice(index, 1);
    }
  }

  editAllowedAgent(agent: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.removeAllowedAgent(agent);
      return;
    }

    // Edit existing fruit
    const index = this.allowedAgents.indexOf(agent);
    if (index >= 0) {
      this.allowedAgents[index].name = value;
    }
  }


  saveDetail(): void {
    if (this.addForm.valid) {
      // Populate the line object with form values
      this.line.username = this.addForm.get('username')?.value;
      this.line.password = this.addForm.get('password')?.value;
      this.line.memberId = this.addForm.get('owner')?.value;
      // Add more properties as needed

      // Call the service to add the line
      this.lineService.addLine(this.line);
      this.dialog.open(UserDialogComponent);
      this.router.navigate(['/apps/lines/users']);
    } else {
      // Handle form errors
      console.error('Form is invalid');
    }
  }


// first option
  firstControl = new FormControl('');
  firstoption: string[] = ['Owner 1', 'Owner 2', 'Owner 3'];

  filteredOptions: Observable<string[]>;
   // first option
   private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.firstoption.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  displayedColumns: string[] = [
    'select',
    'name',
    'streams',
    'movies',
    'series',
    'stations',
    // 'budget',
  ];
  

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): any {
    const numSelected = this.bouquetsSelection.selected.length;
    const numRows = this.bouquetsDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected()
      ? this.bouquetsSelection.clear()
      : this.bouquetsDataSource.data.forEach((row:IBouquet) => this.bouquetsSelection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: BouquetList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.bouquetsSelection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.bouquetOrder + 1
    }`;
  }
}
