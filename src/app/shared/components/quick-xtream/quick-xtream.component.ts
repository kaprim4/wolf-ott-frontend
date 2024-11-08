import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppDialogOverviewComponent} from 'src/app/pages/ui-components/dialog/dialog.component';
import {PackageService} from '../../services/package.service';
import {LineService} from '../../services/line.service';
import {PackageList} from '../../models/package';
import {FormBuilder, FormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {CreateLine, ILine, LineDetail, LineList} from '../../models/line';
import {NotificationService} from '../../services/notification.service';
import {catchError, finalize, tap, throwError} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {UserDetail} from "../../models/user";
import {UserService} from "../../services/user.service";
import {TokenService} from "../../services/token.service";
import { PresetList } from '../../models/preset';
import { PresetService } from '../../services/preset.service';
import { LineFactory } from '../../factories/line.factory';

@Component({
    selector: 'app-quick-xtream',
    templateUrl: './quick-xtream.component.html',
    styleUrl: './quick-xtream.component.scss'
})
export class QuickXtreamComponent implements OnInit {
    username: string = '';
    password: string = '';
    lineCreated: boolean = false;
    packages: PackageList[] = [];
    filteredPackages: PackageList[] = [];
    selectedPackage: PackageList;
    packageSearchTerm = '';
    dropdownOpened = false;
    packageSearchCtrl = new FormControl();
    server: string = "";
    isLoading: boolean = false;
    loggedInUser: any;
    user: any;

    line: LineDetail = LineFactory.initLineDetail();
    presets: PresetList[];
    selectedBundleOption: string = 'packages';
    selectedPresetId:number;
    selectedPackageId:number;

    addForm: UntypedFormGroup;
    packageForm: UntypedFormGroup;
    bundleForm: UntypedFormGroup;

    constructor(
        private lineService: LineService,
        private packageService: PackageService,
        private notificationService: NotificationService,
        private toastr: ToastrService,
        private tokenService: TokenService,
        private userService: UserService,
        private fb: FormBuilder,
        private presetService: PresetService
    ) {
        const username = this.username = LineService.generateRandomUsername();
        const password = this.password = LineService.generateRandomPassword();

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

        this.packageForm = this.fb.group({
            username: [username, Validators.required],
            password: [password, Validators.required],
            package: ['', Validators.required],
        });
        this.bundleForm = this.fb.group({
            bundle: ['packages'],
            preset: [''],
            package: [''],
            lines: [[]]
        });
    }

    ngOnInit(): void {
        this.packageService.getAllPackages<PackageList>().subscribe(list => {
            this.packages = list;
            this.filteredPackages = this.packages;
        })
        this.loggedInUser = this.tokenService.getPayload();
        this.userService.getUser<UserDetail>(this.loggedInUser.sid).subscribe((user) => {
            this.user = user;
            this.server = `http://${this.user.resellerDns}:80/`;
        });

        this.presetService.getAllPresets<PresetList>().subscribe(presets => {
            this.presets = presets;
        });
    }

    createLine() {
        this.isLoading = true;
        const bouquets: number[] = this.selectedPackage.bouquets;
        const isTrial: boolean = this.selectedPackage.isTrial;
        const line: CreateLine = {
            id: 0,
            username: this.username,
            password: this.password,
            packageId: this.selectedPackage.id,
            isTrial: isTrial,
            bouquets: bouquets,
            memberId: this.user.id,
            createdAt: Date.now()
        };
        console.log("line:", line)
        this.lineService.addLine(line).pipe(
            tap(() => {
                this.notificationService.success('Line Created Successfully');
                this.lineCreated = true;
            }),
            catchError((ex) => {
                this.notificationService.error('Failed to create line.');
                console.log(ex)
                return throwError(ex);
            }),
            finalize(() => {
                this.isLoading = false;
            })
        ).subscribe();
    }

    private filterPackages(value: string): any[] {
        const filterValue = value?.toLowerCase();
        return this.packages.filter(pkg => pkg?.packageName?.toLowerCase().includes(filterValue));
    }

    packagesFilterOptions() {
        const searchTermLower = this.packageSearchTerm.toLowerCase();
        this.filteredPackages = this.packages.filter((pkg) =>
            pkg.packageName.toLowerCase().includes(searchTermLower)
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

    getSelectedPackageName(): string {
        const selectedPackagetObj = this.packages?.find(o => o.id === this.selectedPackageId);
        return selectedPackagetObj ? selectedPackagetObj.packageName : 'Select Package';
    }

    get selectedPreset():PresetList|undefined {
        return this.presets.find(p => p.id == this.selectedPresetId);
    }

    onSelectPreset($event: any) {
        const id = $event.value;
        this.selectedPresetId = id;

    }
    getSelectedPresetName(): string {
        const selectedPresetObj = this.presets?.find(o => o.id === this.selectedPresetId);
        return selectedPresetObj ? selectedPresetObj.presetName : 'Select Package';
    }

    bundleToggle($event: any) {
        console.log("Toggle to: ", $event.value);
        switch ($event.value) {
            case 'packages':
                const pkg = this.packages.find(p => p.id === this.addForm.controls['package'].value);
                if (pkg) {
                    this.line.bouquets = pkg.bouquets;
                }
                break;
            case 'presets':
                // Update line.bouquets with the IDs of preset bouquets
                // this.line.bouquets = this.presetBouquets.map(bouquet => bouquet.id);
                break;
            default:
                console.log("Unknown Bundle");
        }

    }

    onSelectPackage($event: any) {
        // console.log("Package Event", $event);
        const id = $event.value; // this.addForm.controls["package"].value;
        console.log("Selection:",$event.value);

        this.selectedPackageId = id;
        if(id != this.addForm.controls["package"].value)
            this.addForm.controls["package"].setValue(id);
        if(id != this.packageForm.controls["package"].value)
            this.packageForm.controls["package"].setValue(id);
        if(id != this.bundleForm.controls["package"].value)
            this.bundleForm.controls["package"].setValue(id);
        const pkg = this.packages.find(o => o.id === id);
        console.log("Selected Package:", pkg);

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
            this.line.isIsplock = pkg.isIsplock;
            this.line.isE2 = pkg.isE2;
            this.line.forcedCountry = pkg.forcedCountry;
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
}
