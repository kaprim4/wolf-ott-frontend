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
import {IUser, UserDetail, UserList} from 'src/app/shared/models/user';
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
import { TokenService } from 'src/app/shared/services/token.service';
import { PresetService } from 'src/app/shared/services/preset.service';
import { PresetList } from 'src/app/shared/models/preset';

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
    selectedOwner: IUser;
    selectedPackage: PackageList;
    ownerSearchTerm = '';
    packageSearchTerm = '';
    dropdownOpened = false;
    addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    presets: PresetList[];
    presetBouquets: BouquetList[] = [];
    presetBouquetsDataSource = new MatTableDataSource<BouquetList>([]);
    presetBouquetsSelection = new SelectionModel<IBouquet>(true, []);
    selectedPreset:number;

    user: UserDetail;
    selectedBundleOption: string = 'packages';

    ownerSearchCtrl = new FormControl();
    packageSearchCtrl = new FormControl();

    financialMetrics = [
        {
            id: 'current_credits',
            color: 'primary',
            icon: 'account_balance',
            title: '0',
            subtitle: 'Total Credits',
        },
        {
            id: 'purchase_cost',
            color: 'warning',
            icon: 'shopping_cart',
            title: '0',
            subtitle: 'Purchase Cost',
        },
        {
            id: 'remain_credits',
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
        private notificationService: NotificationService,
        private tokenService: TokenService,
        private presetService: PresetService
    ) {
        const username = LineService.generateRandomUsername();
        const password = LineService.generateRandomPassword();
        this.addForm = this.fb.group({
            username: [username, Validators.required],
            password: [password, Validators.required],
            owner: ['', Validators.required],
            package: ['', Validators.required],
            packageCost: [0],
            duration: [''],
            maxConnections: [1],
            expirationDate: [''],
            contact: [''],
            resellerNotes: [''],
            isIsplock: [false],
            bypassUa: [false],
            ispDesc: ['']
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

        // console.log(`Form { valid: ${this.addForm.valid}, invalid: ${this.addForm.invalid} }`);
        
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
        
        const loggedInUser = this.tokenService.getPayload();
        this.userService.getUser<UserDetail>(+loggedInUser.sid).subscribe((user) => {
            this.user = user;
            this.updateMatrix();
            this.addForm.controls["owner"].setValue(user.id);
            this.selectedOwner = this.owners.find(o => o.id == user.id) || {id: user.id, username: user.username};
        });

        this.presetService.getAllPresets<PresetList>().subscribe(presets => {
            this.presets = presets;
        });
        
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
        this.filteredOwners = this.owners?.filter((owner) => owner?.username?.toLowerCase().includes(searchTermLower));
    }
    packagesFilterOptions() {
        const searchTermLower = this.packageSearchTerm?.toLowerCase();
        this.filteredPackages = this.packages?.filter((pkg) => pkg.packageName?.toLowerCase().includes(searchTermLower));
    }

    saveDetail(): void {
       console.log(`Form { valid: ${this.addForm.valid}, invalid: ${this.addForm.invalid} }`);
       
        if (this.addForm.valid) {
            const formValues = this.addForm.value;
            const expDate = new Date(formValues.expirationDate).getTime();
            Object.assign(this.line, {
                username: formValues.username,
                password: formValues.password,
                memberId: formValues.owner,
                packageId: formValues.package,
                maxConnections: formValues.maxConnections,
                expDate: expDate,
                resellerNotes: formValues.resellerNotes,
                isIsplock: formValues.isIsplock,
                bypassUa: formValues.bypassUa,
                ispDesc: formValues.ispDesc
            });
            this.lineService.addLine(this.line).subscribe(line => {
                console.log("Created Line :", line);
                this.router.navigate(['/apps/lines/users']);
                this.toastr.success('Line added successfully.', 'Succès');
            })
            // this.dialog.open(UserDialogComponent)            

        } else {
            for (const controlName in this.addForm.controls) {
                const control = this.addForm.get(controlName);
                if(control && control.valid)
                    continue;
                if(control)
                    console.log(`Control: ${controlName}:`, {valid: control.valid, value: control.value, errors: control.errors});
                else
                    console.log(`Control[${controlName}] Not Found`);
                    
            }
            // console.error('Form is invalid', this.addForm.errors);
            this.toastr.error('Form is invalid.', 'Erreur');
        }
    }

    get allowedIps(): any[] {
        const allowedIps: string[] = this.line.allowedIps;
        return allowedIps ? allowedIps.map((ip) => {
            return { value: ip }
        }) : [];
    }
    set allowedIps(ips: any[]) {
        ips = ips.map(ip => ip.value).filter(ip => ip);
        this.line.allowedIps = ips;
    }
    addAllowedIp(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        if (value) {
            const currentIps = this.allowedIps;
            currentIps.push({value});
            this.allowedIps = currentIps;
        }
        event.chipInput!.clear();
    }
    removeAllowedIp(ip: string): void {
        const currentIps = this.allowedIps;
        const index = currentIps.findIndex((item) => item.value === ip);
        if (index >= 0) {
            currentIps.splice(index, 1);
            this.allowedIps = currentIps;
        }
    }
    editAllowedIp(ip: string, event: MatChipEditedEvent) {
        const value = event.value.trim();
        if (!value) {
            this.removeAllowedIp(ip);
            return;
        }
        const currentIps = this.allowedIps;
        const index = currentIps.findIndex((item) => item.value === ip);
        if (index >= 0) {
            currentIps[index].value = value;
            this.allowedIps = currentIps;
        }
    }

    get allowedAgents(): any[] {
        const allowedAgents: string[] = this.line.allowedUa;
        return allowedAgents ? allowedAgents.map((agent) => {
            return {value: agent};
        }) : [];
    }
    set allowedAgents(agents: any[]) {
        agents = agents.map(agent => agent.value).filter(agent => agent);
        this.line.allowedUa = agents;
    }
    addAllowedAgent(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        if (value) {
            const currentAgents = this.allowedAgents;
            currentAgents.push({value});
            this.allowedAgents = currentAgents;
        }
        event.chipInput!.clear();
    }
    editAllowedAgent(agent: string, event: MatChipEditedEvent) {
        const value = event.value.trim();
        if (!value) {
            this.removeAllowedAgent(agent);
            return;
        }
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

    onOwnersDropdownOpened(opened: boolean) {
        this.dropdownOpened = opened;
        if (opened) {
            // Reset search term and filter options when the dropdown opens
            this.ownerSearchTerm = '';
            this.ownersFilterOptions();
        }
    }
    onSelectOwner($event: any) {
        const id = this.addForm.controls["owner"].value;
        const owner = this.owners.find(o => o.id === id);
        if(owner)
            this.selectedOwner = owner;
        else
            console.log(`Ops!! Owner[${id}] not found`);
    }

    onPackagesDropdownOpened(opened: boolean) {
        this.dropdownOpened = opened;
        if (opened) {
            // Reset search term and filter options when the dropdown opens
            this.packageSearchTerm = '';
            this.packagesFilterOptions();
        }
    }
    onSelectPackage($event: any) {     
        // console.log("Package Event", $event);
        const id = $event; // this.addForm.controls["package"].value;
        if(id != this.addForm.controls["package"].value)
            this.addForm.controls["package"].setValue(id);
        const pkg = this.packages.find(o => o.id === id);
        if(pkg){
            this.line.packageId = pkg.id;
            this.selectedPackage = pkg;
            if(pkg.isOfficial){
                this.addForm.controls["packageCost"].setValue(pkg.officialCredits);
                this.addForm.controls["duration"].setValue(pkg.officialDuration);
                const expiration = PackageService.getPackageExpirationDate(pkg.officialDuration, pkg.officialDurationIn);
                // console.log("Official Expiration :", expiration);
                this.addForm.controls["expirationDate"].setValue(this.formatDateTime(expiration));
            }else{
                this.addForm.controls["packageCost"].setValue(pkg.trialCredits);
                this.addForm.controls["duration"].setValue(pkg.trialDuration);
                const expiration = PackageService.getPackageExpirationDate(pkg.trialDuration, pkg.trialDurationIn);
                // console.log("Trial Expiration :", expiration);
                this.addForm.controls["expirationDate"].setValue(this.formatDateTime(expiration));
            }
            if(this.selectedBundleOption === 'packages')
                this.line.bouquets = pkg.bouquets;
            this.updateSelection();
            this.line.isIsplock = pkg.isIsplock;
            this.line.isE2 = pkg.isE2;
            this.line.forcedCountry = pkg.forcedCountry;
            this.updateMatrix();
        }
        else
            console.log(`Ops!! Package[${id}] not found`);
            
        // console.log("Select Package", this.selectedPackage);
    }

    formatDateTime(date:Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    onSelectPreset($event: any) {
        const id = $event;
        this.bouquetsLoading = true;
        this.presetService.getAllPresetBouquets(id).subscribe(res => {
            console.log("Preset Bouquets:", res);
            
            this.presetBouquets = res || [];
            this.bouquetsLoading = false;
            this.presetBouquetsDataSource.data = res || [];
            this.updatePresetSelection();
            this.line.bouquets = this.presetBouquets.map(bouquet => bouquet.id);
        })
    }
    getSelectedPresetName(): string {
        const selectedPresetObj = this.presets?.find(o => o.id === this.selectedPreset);
        return selectedPresetObj ? selectedPresetObj.presetName : 'Select Package';
    }
    isAllPresetBouquetsSelected(): boolean {
        const numSelected = this.presetBouquetsSelection.selected.length;
        const numRows = this.presetBouquetsDataSource.data.length;
        return numSelected === numRows;
    }
    presetBouquetsMasterToggle() {
        if (this.isAllPresetBouquetsSelected()) {
            const selectedIds = this.presetBouquetsSelection.selected.map(item => item.id);
            selectedIds.forEach(id => {
                const index = this.line.bouquets.indexOf(id);
                if (index >= 0) {
                    this.line.bouquets.splice(index, 1);
                }
            });
            this.presetBouquetsSelection.clear();
        } else {
            this.presetBouquetsDataSource.data.forEach(row => {
                if (!this.line.bouquets.includes(row.id)) {
                    this.line.bouquets.push(row.id);
                }
                this.presetBouquetsSelection.select(row);
            });
        }
    }
    presetCheckboxLabel(row?: BouquetList): string {
        if (!row) {
            return `${this.isAllPresetBouquetsSelected() ? 'select' : 'deselect'} all`;
        }
        return `${ this.presetBouquetsSelection.isSelected(row) ? 'deselect' : 'select' } row ${row.bouquetOrder + 1}`;
    }
    updatePresetBouquetSelection(element: any) {
        if (this.presetBouquetsSelection.isSelected(element)) {
            this.line.bouquets.push(element.id);
        } else {
            const index = this.line.bouquets.indexOf(element.id);
            if (index >= 0) {
                this.line.bouquets.splice(index, 1);
            }
        }
        console.log("Line Bouquets ", this.line.bouquets.length);
        
    }
    updatePresetSelection() {
        this.presetBouquetsSelection.clear();
        this.presetBouquetsDataSource.data.forEach(bouquet => {
            this.presetBouquetsSelection.select(bouquet);
        });
    }

    isAllBouquetsSelected(): boolean {
        const numSelected = this.bouquetsSelection.selected.length;
        const numRows = this.bouquetsDataSource.data.length;
        return numSelected === numRows;
    }
    bouquetsMasterToggle() {
        if (this.isAllBouquetsSelected()) {
            const selectedIds = this.bouquetsSelection.selected.map(item => item.id);
            selectedIds.forEach(id => {
                const index = this.line.bouquets.indexOf(id);
                if (index >= 0) {
                    this.line.bouquets.splice(index, 1);
                }
            });
            this.bouquetsSelection.clear();
        } else {
            this.bouquetsDataSource.data.forEach(row => {
                if (!this.line.bouquets.includes(row.id)) {
                    this.line.bouquets.push(row.id);
                }
                this.bouquetsSelection.select(row);
            });
        }
    }
    checkboxLabel(row?: BouquetList): string {
        if (!row) {
            return `${this.isAllBouquetsSelected() ? 'select' : 'deselect'} all`;
        }
        return `${ this.bouquetsSelection.isSelected(row) ? 'deselect' : 'select' } row ${row.bouquetOrder + 1}`;
    }
    updateBouquetSelection(element: any) {
        if (this.bouquetsSelection.isSelected(element)) {
            this.line.bouquets.push(element.id);
        } else {
            const index = this.line.bouquets.indexOf(element.id);
            if (index >= 0) {
                this.line.bouquets.splice(index, 1);
            }
        }
        console.log("Line Bouquets ", this.line.bouquets.length);
    }
    updateSelection() {
        this.bouquetsSelection.clear();
        this.bouquetsDataSource.data.forEach(bouquet => {
            if (this.line.bouquets.includes(bouquet.id)) {
                this.bouquetsSelection.select(bouquet);
            }
        });
    }
    
    updateMatrix(){
        const id = this.line.packageId;
        const credits = (this.user?.credits) || 0;
        const pkg = this.packages.find(p => p.id === id);
        const cost = (pkg?.isOfficial ? pkg.officialCredits : pkg?.trialCredits) || 0;
        this.financialMetrics.forEach(matrix => {
            switch(matrix.id){
                case 'current_credits':
                    matrix.title = credits.toString();
                    break;
                case 'purchase_cost':
                    matrix.title = cost.toString();
                    break;
                case 'remain_credits':
                    matrix.title = (credits - cost).toString();
            }
        });
    }

    bundleToggle($event: any) {
        console.log("Toggle to: ", $event.value);
        switch ($event.value) {
            case 'packages':
                const pkg = this.packages.find(p => p.id === this.addForm.controls['package'].value);
                if (pkg) {
                    // Update line.bouquets with the selected package's bouquet IDs
                    this.line.bouquets = pkg.bouquets;
    
                    // Clear current selection
                    this.bouquetsSelection.clear();
                    
                    // Select new bouquets based on the IDs in pkg.bouquets
                    const selectedBouquets = this.bouquetsDataSource.data.filter(bouquet => pkg.bouquets.includes(bouquet.id));
                    this.bouquetsSelection.select(...selectedBouquets);
                }
                break;
            case 'presets':
                // Update line.bouquets with the IDs of preset bouquets
                this.line.bouquets = this.presetBouquets.map(bouquet => bouquet.id);
    
                // Clear current selection
                this.presetBouquetsSelection.clear();
                
                // Select all preset bouquets
                this.presetBouquetsSelection.select(...this.presetBouquets);
                break;
            default:
                console.log("Unknown Bundle");
        }

    }
    
    
}
