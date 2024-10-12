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
import { SelectionModel } from '@angular/cdk/collections';
import { map, Observable, startWith } from 'rxjs';

export interface PeriodicElement {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  productName: string;
  budget: number;
  priority: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Sunil Joshi',
    position: 'Web Designer',
    productName: 'Elite Admin',
    budget: 3.9,
    priority: 'low',
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-2.jpg',
    uname: 'Andrew McDownland',
    position: 'Project Manager',
    productName: 'Real Homes Theme',
    budget: 24.5,
    priority: 'medium',
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user-3.jpg',
    uname: 'Christopher Jamil',
    position: 'Project Manager',
    productName: 'MedicalPro Theme',
    budget: 12.8,
    priority: 'high',
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user-4.jpg',
    uname: 'Nirav Joshi',
    position: 'Frontend Engineer',
    productName: 'Hosting Press HTML',
    budget: 2.4,
    priority: 'critical',
  },
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Sunil Joshi',
    position: 'Web Designer',
    productName: 'Elite Admin',
    budget: 3.9,
    priority: 'low',
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-2.jpg',
    uname: 'Andrew McDownland',
    position: 'Project Manager',
    productName: 'Real Homes Theme',
    budget: 24.5,
    priority: 'medium',
  },
];

@Component({
  selector: 'app-add-user-line',
  templateUrl: './add-user-line.component.html',
  styleUrls: ['./add-user-line.component.scss']
})
export class AddUserLineComponent implements OnInit {
  
  addForm: UntypedFormGroup;
  line: LineDetail;


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
    private router: Router,
    public dialog: MatDialog
  ) {
    // Initialize the line object
    this.line = {
      id: 0,
      memberId: 0,
      username: '',
      password: '',
      lastIp: '',
      expDate: 0,
      adminEnabled: false,
      enabled: true,
      adminNotes: null,
      resellerNotes: null,
      bouquet: '',
      allowedOutputs: '',
      maxConnections: 1,
      isRestreamer: false,
      isTrial: false,
      isMag: false,
      isE2: false,
      isStalker: false,
      isIsplock: false,
      allowedIps: '[]',
      allowedUa: '[]',
      createdAt: 0,
      pairId: null,
      forceServerId: 0,
      asNumber: '',
      ispDesc: '',
      forcedCountry: '',
      bypassUa: false,
      playToken: null,
      lastExpirationVideo: null,
      packageId: null,
      accessToken: null,
      contact: null,
      lastActivity: 0,
      lastActivityArray: '',
      updated: null
    };

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
      this.line.adminNotes = this.addForm.get('owner')?.value;
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
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): any {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
}
