import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
    FormControl,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatChipInputEvent, MatChipEditedEvent} from '@angular/material/chips';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {map, startWith, Observable, catchError, of} from 'rxjs';
import {LineFactory} from 'src/app/shared/factories/line.factory';
import {UserDialogComponent} from '../../../user/pages/user-dialog/user-dialog.component';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {LineDetail} from 'src/app/shared/models/line';
import {BouquetList, IBouquet} from 'src/app/shared/models/bouquet';
import {IUser, UserList} from 'src/app/shared/models/user';
import {PackageList} from 'src/app/shared/models/package';
import {LineService} from 'src/app/shared/services/line.service';
import {PackageService} from 'src/app/shared/services/package.service';
import {UserService} from 'src/app/shared/services/user.service';
import {BouquetService} from 'src/app/shared/services/bouquet.service';
import {ToastrService} from "ngx-toastr";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Page } from 'src/app/shared/models/page';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
    selector: 'app-add-user-line',
    templateUrl: './add-user-line.component.html',
    styleUrls: ['./add-user-line.component.scss'],
})
export class AddUserLineComponent implements OnInit, AfterViewInit {
    bouquetsDisplayedColumns: string[] = [
        'chk',
        'id',
        'bouquetName',
        'streams',
        'movies',
        'series',
        'stations',
        // 'action',
      ];
    addForm: UntypedFormGroup;
    line: LineDetail = LineFactory.initLineDetail();
    bouquetsDataSource = new MatTableDataSource<BouquetList>([]);
    bouquetsSelection = new SelectionModel<IBouquet>(true, []);
    bouquetTotalElements = 0;
    bouquetPageSize = 10;
    bouquetPageIndex = 0;
    bouquetsLoading: boolean = false;
    owners: UserList[] = [];
    packages: PackageList[] = [];
    bouquets: Page<BouquetList>;
    filteredOwners: UserList[] = [];
    filteredPackages: PackageList[] = [];
    selectedOwner: UserList;
    selectedPackage: PackageList;
    ownerSearchTerm = '';
    packageSearchTerm = '';
    dropdownOpened = false;
    addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;

    ownerSearchCtrl = new FormControl();
    packageSearchCtrl = new FormControl();

    // allowedIps: { value: string }[] = [
    //     { value: '127.0.0.1' },
    //     { value: '192.168.1.1' },
    // ];
    // allowedAgents: { value: string }[] = [
    //     { value: 'Mozilla' },
    //     { value: 'Chrome' },
    // ];
    financialMetrics = [
        {
            color: 'primary',
            icon: 'account_balance',
            title: '0',
            subtitle: 'Total Credits',
        },
        {
            color: 'warning',
            icon: 'shopping_cart',
            title: '0',
            subtitle: 'Purchase Cost',
        },
        {
            color: 'accent',
            icon: 'wallet',
            title: '0',
            subtitle: 'Remaining Credits',
        },
    ];

    @ViewChild(MatSort) bouquetSort: MatSort;
    @ViewChild(MatPaginator) bouquetPaginator: MatPaginator;

    constructor(
        private fb: UntypedFormBuilder,
        private lineService: LineService,
        private userService: UserService,
        private packageService: PackageService,
        private bouquetService: BouquetService,
        private router: Router,
        public dialog: MatDialog,
        private toastr: ToastrService,
        private notificationService: NotificationService
    ) {
        const username = LineService.generateRandomUsername();
        const password = LineService.generateRandomPassword();
        this.addForm = this.fb.group({
            username: [username, Validators.required],
            password: [password, Validators.required],
            owner: ['', Validators.required],
            package: ['', Validators.required],
            packageCost: [null, Validators.required],
            duration: ['', Validators.required],
            maxConnections: [1, Validators.required],
            expirationDate: ['', Validators.required],
            contact: ['', [Validators.required, Validators.email]],
            resellerNotes: [''],
        });

        this.ownerSearchCtrl.valueChanges.pipe(
            startWith(''),
            map(value => this.filterOwners(value))
        ).subscribe(filtered => {
            this.filteredOwners = filtered;
        });

        this.packageSearchCtrl.valueChanges.pipe(
            startWith(''),
            map(value => this.filterPackages(value))
        ).subscribe(filtered => {
            this.filteredPackages = filtered;
        });

    }
    ngAfterViewInit(): void {
        this.bouquetsDataSource.sort = this.bouquetSort;
        this.bouquetSort?.sortChange.subscribe(() => this.loadBouquets());
        this.bouquetPaginator?.page.subscribe(() => this.loadBouquets());
    }

    ngOnInit(): void {
        this.userService
            .getAllUsers<UserList>()
            .subscribe((users: UserList[]) => {
                this.owners = users;
                this.filteredOwners = this.owners;
            });

        this.packageService
            .getAllPackages<PackageList>()
            .subscribe((packages: PackageList[]) => {
                this.packages = packages;
                this.filteredPackages = this.packages;
            });

            this.loadBouquets();
        
    }

    loadBouquets(): void {
        const page = this.bouquetPaginator?.pageIndex || this.bouquetPageIndex;
        const size = this.bouquetPaginator?.pageSize || this.bouquetPageSize;
        this.bouquetsLoading = true;

        this.bouquetService.getBouquets<BouquetList>('', page, size).pipe(
            catchError(error => {
            console.error('Failed to load bouquets', error);
            this.bouquetsLoading = false;
            this.notificationService.error('Failed to load bouquets. Please try again.');
            return of({ content: [], totalPages: 0, totalElements: 0, size: 0, number:0 } as Page<BouquetList>);
            })
        ).subscribe(pageResponse => {
            this.bouquetsDataSource.data = pageResponse.content;
            this.bouquetTotalElements = pageResponse.totalElements;
            this.bouquetsLoading = false;
            this.updateSelection();
        });
    }

    private filterOwners(value: string): any[] {
        const filterValue = value?.toLowerCase();
        return this.owners.filter(owner => owner?.username?.toLowerCase().includes(filterValue));
    }

    private filterPackages(value: string): any[] {
        const filterValue = value?.toLowerCase();
        return this.packages.filter(pkg => pkg?.packageName?.toLowerCase().includes(filterValue));
    }

    ownersFilterOptions() {
        const searchTermLower = this.ownerSearchTerm?.toLowerCase();
        this.filteredOwners = this.owners?.filter((owner) =>
            owner?.username?.toLowerCase().includes(searchTermLower)
        );
    }

    packagesFilterOptions() {
        const searchTermLower = this.packageSearchTerm?.toLowerCase();
        this.filteredPackages = this.packages?.filter((pkg) =>
            pkg.packageName?.toLowerCase().includes(searchTermLower)
        );
    }

    addAllowedItem(event: MatChipInputEvent, list: { name: string }[]): void {
        const value = (event.value || '').trim();
        if (value) {
            list.push({name: value});
        }
        event.chipInput!.clear();
    }

    removeAllowedItem(item: { name: string }, list: { name: string }[]): void {
        const index = list.indexOf(item);
        if (index >= 0) {
            list.splice(index, 1);
        }
    }

    editAllowedItem(
        item: { name: string },
        event: MatChipEditedEvent,
        list: { name: string }[]
    ): void {
        const value = event.value.trim();
        if (!value) {
            this.removeAllowedItem(item, list);
            return;
        }
        const index = list.indexOf(item);
        if (index >= 0) {
            list[index].name = value;
        }
    }

    saveDetail(): void {
        if (this.addForm.valid) {
            const formValues = this.addForm.value;
            Object.assign(this.line, {
                username: formValues.username,
                password: formValues.password,
                memberId: formValues.owner,
                // Add other properties as needed
            });
            this.lineService.addLine(this.line);
            this.dialog.open(UserDialogComponent);
            this.router.navigate(['/apps/lines/users']);
            this.toastr.success('Line added successfully.', 'Succès');
        } else {
            console.error('Form is invalid');
            this.toastr.error('Form is invalid.', 'Erreur');
        }
    }

    isAllSelected(): boolean {
        const numSelected = this.bouquetsSelection.selected.length;
        const numRows = this.bouquetsDataSource.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        if (this.isAllSelected()) {
            // Deselect all
            const selectedIds = this.bouquetsSelection.selected.map(item => item.id);
            selectedIds.forEach(id => {
                const index = this.line.bouquet.indexOf(id);
                if (index >= 0) {
                    this.line.bouquet.splice(index, 1); // Remove ID from line.bouquet
                }
            });
            this.bouquetsSelection.clear(); // Clear the selection
        } else {
            // Select all
            this.bouquetsDataSource.data.forEach(row => {
                if (!this.line.bouquet.includes(row.id)) {
                    this.line.bouquet.push(row.id); // Add ID to line.bouquet
                }
                this.bouquetsSelection.select(row); // Select the row
            });
        }
    }
    

    checkboxLabel(row?: BouquetList): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${
            this.bouquetsSelection.isSelected(row) ? 'deselect' : 'select'
        } row ${row.bouquetOrder + 1}`;
    }

    onOwnersDropdownOpened(opened: boolean) {
        this.dropdownOpened = opened;
        if (opened) {
            // Reset search term and filter options when the dropdown opens
            this.ownerSearchTerm = '';
            this.ownersFilterOptions();
        }
    }

    onPackagesDropdownOpened(opened: boolean) {
        this.dropdownOpened = opened;
        if (opened) {
            // Reset search term and filter options when the dropdown opens
            this.packageSearchTerm = '';
            this.packagesFilterOptions();
        }
    }

    addAllowedIp(event: MatChipInputEvent): void {
        console.log("Start Add IP");
        const value = (event.value || '').trim();
        console.log("Get IP", value);
        if (value) {
            const currentIps = this.allowedIps; // Get current allowed IPs
            console.log("Get CurrentIP's", currentIps);
            currentIps.push({value}); // Add new IP as an object
            console.log("Get IP's", currentIps);
            this.allowedIps = currentIps; // Update allowedIps using the setter
        }
        event.chipInput!.clear(); // Clear the input value
    }


    removeAllowedIp(ip: string): void {
        const currentIps = this.allowedIps; // Get current allowed IPs
        const index = currentIps.findIndex((item) => item.value === ip); // Find index by value
        if (index >= 0) {
            currentIps.splice(index, 1); // Remove IP
            this.allowedIps = currentIps; // Update allowedIps using the setter
        }
    }

    editAllowedIp(ip: string, event: MatChipEditedEvent) {
        const value = event.value.trim();
        // Remove IP if it no longer has a name
        if (!value) {
            this.removeAllowedIp(ip);
            return;
        }
        // Edit existing IP
        const currentIps = this.allowedIps; // Get current allowed IPs
        const index = currentIps.findIndex((item) => item.value === ip); // Find index by value
        if (index >= 0) {
            currentIps[index].value = value; // Update value
            this.allowedIps = currentIps; // Update allowedIps using the setter
        }
    }

    addAllowedAgent(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        // Add our fruit
        if (value) {
            this.allowedIps.push({value});
        }
        // Clear the input value
        event.chipInput!.clear();
    }

    editAllowedAgent(agent: string, event: MatChipEditedEvent) {
        const value = event.value.trim();
        // Remove fruit if it no longer has a name
        if (!value) {
            this.removeAllowedAgent(agent);
            return;
        }
        // Edit existing fruit
        const index = this.allowedAgents.indexOf({value: agent});
        if (index >= 0) {
            this.allowedAgents[index].value = value;
        }
    }

    removeAllowedAgent(agent: string): void {
        const index = this.allowedAgents.indexOf({value: agent});
        if (index >= 0) {
            this.allowedAgents.splice(index, 1);
        }
    }

    get allowedIps(): any[] {
        const allowedIps: any[] = this.line && this.line.allowedIps ? (JSON.parse(this.line.allowedIps).array as string[]) : [];
        return allowedIps ? allowedIps.map((ip) => {
            value: ip;
        }) : [];
    }

    set allowedIps(ips: string[]) {
        ips = ips.filter(ip => ip);
        this.line.allowedIps = JSON.stringify({array: ips});
    }

    get allowedAgents(): any[] {
        const allowedAgents: any[] = this.line && this.line.allowedUa ? (JSON.parse(this.line.allowedUa).array as string[]) : [];
        return allowedAgents ? allowedAgents.map((agent) => {
            value: agent;
        }) : [];
    }

    set allowedAgents(agents: string[]) {
        agents = agents.filter(agent => agent);
        this.line.allowedUa = JSON.stringify({array: agents});
    }

    onSelectOwner($event: any) {
        // console.log("All Owners", this.owners);
        
        const id = this.addForm.controls["owner"].value;
        const owner = this.owners.find(o => o.id === id);
        if(owner)
            this.selectedOwner = owner;
        else
            console.log(`Ops!! Owner[${id}] not found`);
            
        // console.log("Select Owner", this.selectedOwner);
    }

    onSelectPackage($event: any) {
        // console.log("All Packages", this.packages);
        
        const id = this.addForm.controls["package"].value;
        const pkg = this.packages.find(o => o.id === id);
        if(pkg){
            this.selectedPackage = pkg;
            if(pkg.isOfficial){
                this.addForm.controls["packageCost"].setValue(pkg.officialCredits);
                this.addForm.controls["duration"].setValue(pkg.officialDuration);
                const expiration = PackageService.getPackageExpirationDate(pkg.officialDuration, pkg.officialDurationIn);
                console.log("Official Expiration :", expiration);
                this.addForm.controls["expirationDate"].setValue(this.formatDateTime(expiration));
            }else{
                this.addForm.controls["packageCost"].setValue(pkg.trialCredits);
                this.addForm.controls["duration"].setValue(pkg.trialDuration);
                const expiration = PackageService.getPackageExpirationDate(pkg.trialDuration, pkg.trialDurationIn);
                console.log("Trial Expiration :", expiration);
                this.addForm.controls["expirationDate"].setValue(this.formatDateTime(expiration));
            }
            this.line.bouquet = pkg.bouquets;
            this.updateSelection();
        }
        else
            console.log(`Ops!! Package[${id}] not found`);
            
        console.log("Select Package", this.selectedPackage);
    }

    formatDateTime(date:Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`; // Format for datetime-local
    }

    updateBouquetSelection(element: any) {
        if (this.bouquetsSelection.isSelected(element)) {
            this.line.bouquet.push(element.id); // Add ID to bouquets
        } else {
            const index = this.line.bouquet.indexOf(element.id);
            if (index >= 0) {
                this.line.bouquet.splice(index, 1); // Remove ID from bouquets
            }
        }

        console.log("Line Bouquets ", this.line.bouquet.length);
        
    }

    updateSelection() {
        this.bouquetsSelection.clear(); // Clear current selection

        this.bouquetsDataSource.data.forEach(bouquet => {
            if (this.line.bouquet.includes(bouquet.id)) {
                this.bouquetsSelection.select(bouquet); // Select if ID is in the selected IDs array
            }
        });
    }
    
}
