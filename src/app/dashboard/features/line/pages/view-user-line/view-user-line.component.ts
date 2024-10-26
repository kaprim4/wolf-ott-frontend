import { Component, OnInit } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { map, startWith, Observable } from 'rxjs';
import { LineFactory } from 'src/app/shared/factories/line.factory';
import { UserDialogComponent } from '../../../user/pages/user-dialog/user-dialog.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LineDetail } from 'src/app/shared/models/line';
import { BouquetList, IBouquet } from 'src/app/shared/models/bouquet';
import { UserList } from 'src/app/shared/models/user';
import { PackageList } from 'src/app/shared/models/package';
import { LineService } from 'src/app/shared/services/line.service';
import { PackageService } from 'src/app/shared/services/package.service';
import { UserService } from 'src/app/shared/services/user.service';
import { BouquetService } from 'src/app/shared/services/bouquet.service';

@Component({
    selector: 'app-view-user-line',
    templateUrl: './view-user-line.component.html',
    styleUrl: './view-user-line.component.scss',
})
export class ViewUserLineComponent {
    id: number;
    bouquetsDisplayedColumns: string[] = [
        'select',
        'name',
        'streams',
        'movies',
        'series',
        'stations',
        // 'budget',
    ];
    addForm: UntypedFormGroup;
    line: LineDetail = LineFactory.initLineDetail();
    bouquetsDataSource = new MatTableDataSource<BouquetList>([]);
    bouquetsSelection = new SelectionModel<IBouquet>(true, []);
    owners: UserList[] = [];
    packages: PackageList[] = [];
    bouquets: BouquetList[] = [];
    filteredOwners: UserList[] = [];
    filteredPackages: PackageList[] = [];
    selectedOwner: UserList;
    selectedPackage: PackageList;
    ownerSearchTerm = '';
    packageSearchTerm = '';
    dropdownOpened = false;
    addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
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

    constructor(
        private fb: UntypedFormBuilder,
        private lineService: LineService,
        private userService: UserService,
        private packageService: PackageService,
        private bouquetService: BouquetService,
        private router: Router,
        public dialog: MatDialog,
        private activeRouter: ActivatedRoute
    ) {
        this.id = this.activeRouter.snapshot.paramMap.get(
            'id'
        ) as unknown as number;
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

        this.lineService.getLine<LineDetail>(this.id).subscribe((line) => {
            this.line = line;
            this.initializeForm(this.line);
        });

        // this.bouquetService
        //     .getAllBouquets<BouquetList>()
        //     .subscribe((bouquets: BouquetList[]) => {
        //         this.bouquets = bouquets;
        //         this.bouquetsDataSource = new MatTableDataSource<BouquetList>(
        //             this.bouquets
        //         );
        //         const lineBouquets =
        //             this.line && this.line.bouquet
        //                 ? (JSON.parse(this.line.bouquet).array as number[])
        //                 : [];
        //         const selectedBouquets = lineBouquets.map(
        //             (id) =>
        //                 this.bouquets.find((bouquet) => bouquet.id === id) || {
        //                     id: 0,
        //                 }
        //         );
        //         this.bouquetsSelection = new SelectionModel<IBouquet>(
        //             true,
        //             selectedBouquets
        //         );
        //     });
    }

    initializeForm(line: LineDetail): void {
        this.addForm = this.fb.group({
            username: [line.username, Validators.required],
            password: [line.password, Validators.required],
            memberId: [line.memberId, Validators.required],
            packageId: [line.packageId, Validators.required],
            packageCost: [0, Validators.required],
            duration: [0, Validators.required],
            maxConnections: [1, Validators.required],
            expirationDate: [line.expDate, Validators.required],
            contact: [line.contact, [Validators.required, Validators.email]],
            resellerNotes: [line.adminNotes],
        });
    }

    ownersFilterOptions() {
        const searchTermLower = this.ownerSearchTerm.toLowerCase();
        this.filteredOwners = this.owners.filter((owner) =>
            owner.username.toLowerCase().includes(searchTermLower)
        );
    }

    packagesFilterOptions() {
        const searchTermLower = this.packageSearchTerm.toLowerCase();
        this.filteredPackages = this.packages.filter((pkg) =>
            pkg.packageName.toLowerCase().includes(searchTermLower)
        );
    }

    addAllowedItem(event: MatChipInputEvent, list: { name: string }[]): void {
        const value = (event.value || '').trim();
        if (value) {
            list.push({ name: value });
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
        } else {
            console.error('Form is invalid');
        }
    }

    isAllSelected(): boolean {
        const numSelected = this.bouquetsSelection.selected.length;
        const numRows = this.bouquetsDataSource.data.length;
        return numSelected === numRows;
    }

    masterToggle(): void {
        this.isAllSelected()
            ? this.bouquetsSelection.clear()
            : this.bouquetsDataSource.data.forEach((row) =>
                  this.bouquetsSelection.select(row)
              );
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
        console.log('Start Add IP');
        const value = (event.value || '').trim();
        console.log('Get IP', value);
        if (value) {
            const currentIps = this.allowedIps; // Get current allowed IPs
            console.log("Get CurrentIP's", currentIps);
            currentIps.push({ value }); // Add new IP as an object
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
            this.allowedIps.push({ value });
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
        const index = this.allowedAgents.indexOf({ value: agent });
        if (index >= 0) {
            this.allowedAgents[index].value = value;
        }
    }

    removeAllowedAgent(agent: string): void {
        const index = this.allowedAgents.indexOf({ value: agent });
        if (index >= 0) {
            this.allowedAgents.splice(index, 1);
        }
    }

    get allowedIps(): any[] {
        const allowedIps: string[] = this.line.allowedIps;
        return allowedIps
            ? allowedIps.map((ip) => {
                  value: ip;
              })
            : [];
    }

    set allowedIps(ips: string[]) {
        ips = ips.filter((ip) => ip);
        this.line.allowedIps = ips;
    }

    get allowedAgents(): any[] {
        const allowedAgents: string[] = this.line.allowedUa;
        return allowedAgents
            ? allowedAgents.map((agent) => {
                  value: agent;
              })
            : [];
    }

    set allowedAgents(agents: string[]) {
        agents = agents.filter((agent) => agent);
        this.line.allowedUa = agents;
    }
}
