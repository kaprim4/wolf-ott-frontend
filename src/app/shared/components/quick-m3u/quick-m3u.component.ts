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
import {LoggingService} from "../../../services/logging.service";

@Component({
    selector: 'app-quick-m3u',
    templateUrl: './quick-m3u.component.html',
    styleUrl: './quick-m3u.component.scss'
})
export class QuickM3uComponent implements OnInit {
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

    panelOpened:boolean = false;

    line: LineDetail = LineFactory.initLineDetail();

    presets: PresetList[];
    selectedBundleOption: string = 'packages';
    selectedPresetId:number;
    selectedPackageId:number;

    addForm: UntypedFormGroup;
    packageForm: UntypedFormGroup;
    bundleForm: UntypedFormGroup;
    m3uForm: UntypedFormGroup;

    constructor(
        private lineService: LineService,
        private packageService: PackageService,
        private notificationService: NotificationService,
        private toastr: ToastrService,
        private tokenService: TokenService,
        private userService: UserService,
        private fb: FormBuilder,
        private presetService: PresetService,
        private loggingService: LoggingService
    ) {
        const username = this.username = LineService.generateRandomUsername();
        const password = this.password = LineService.generateRandomPassword();

        this.addForm = this.fb.group({
            username: [username, Validators.required],
            password: [password, Validators.required],
            use_vpn: [false, Validators.required],
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
            use_vpn: [false, Validators.required],
            package: ['', Validators.required],
        });
        this.bundleForm = this.fb.group({
            bundle: ['packages'],
            preset: [''],
            package: [''],
            lines: [[]]
        });
        this.m3uForm = this.fb.group({
            m3u: [''],
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
            this.loggingService.log(this.user);
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

        const username: string = this.packageForm.controls['username'].value;
        const password: string = this.packageForm.controls['password'].value;
        const useVPN: boolean = this.packageForm.controls['use_vpn'].value;

        const line: CreateLine = {
            id: 0,
            username: username,
            password: password,
            useVPN: useVPN,
            packageId: this.selectedPackage.id,
            isTrial: isTrial,
            bouquets: bouquets,
            memberId: this.user.id,
            createdAt: Date.now()
        };
        this.loggingService.log("line:", line)
        this.lineService.addLine<LineDetail>(line).pipe(
            tap(() => {
                // This will only run if the line creation is successful
                this.notificationService.success('Line Created Successfully');
                this.lineCreated = true;
            }),
            catchError((ex) => {
                // Handle the error here
                // Optionally notify the user of the error
                this.notificationService.error('Failed to create line.'); // Example error notification
                return throwError(ex); // Rethrow the error for further handling if needed
            }),
            finalize(() => {
                this.isLoading = false;
            })
        ).subscribe(l => {
            if(l.useVPN && l.vpnDns){
                if(l.vpnDns.includes('http')){
                    this.server = `${l.vpnDns}/`;
                }else{
                    this.server = `http://${l.vpnDns}:80/`;
                }

            }
        });
    }

    get canCreate(): boolean {
        return !this.isLoading && !this.selectedPackage?.id
    }

    get playlistUrl(): string {
        return `${this.server}playlist/${this.username}/${this.password}/m3u_plus`;
    }

    get downloadUrl(): string {
        return `${this.server}get.php?username=${this.username}&password=${this.password}&type=m3u_plus&output=mpegts`;
    }

    copyToClipboard(url: string) {
        this.isLoading = true;
        navigator.clipboard.writeText(url).then(() => {
            this.loggingService.log('Copied to clipboard: ', url);
            this.toastr.success('Copied to clipboard.', 'Succès');
            this.isLoading = false; // Fin du chargement
        }).catch(err => {
            this.loggingService.error('Could not copy: ', err);
            this.toastr.error('Could not copy.', 'Erreur');
            this.isLoading = false;
        });
    }

    downloadM3U(url: string) {
        this.isLoading = true;
        this.toastr.info('Download in progress...', 'Download');
        fetch(url).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Get the filename from the Content-Disposition header
            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = `playlist_${this.username}_plus.m3u`; // Default filename
            if (contentDisposition) {
                const matches = /filename[^;=\n]*=((['"]).*?\2|([^;\n]*))/i.exec(contentDisposition);
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, ''); // Clean up quotes
                }
            }
            return response.blob().then(blob => ({blob, filename})); // Return both the Blob and the filename
        }).then(({blob, filename}) => {
            const link = document.createElement('a');
            const blobUrl = window.URL.createObjectURL(blob); // Create a URL for the Blob
            link.href = blobUrl;
            link.download = filename; // Set the filename from response
            document.body.appendChild(link);
            link.click(); // Programmatically click the link to trigger the download
            link.remove(); // Remove the link from the document
            window.URL.revokeObjectURL(blobUrl); // Clean up the URL.createObjectURL
            this.isLoading = false;
            this.toastr.success('Download completed', 'Succès');
        }).catch(error => {
            this.loggingService.error('There was a problem with the fetch operation:', error);
            this.isLoading = false;
            this.toastr.error('Download failed', 'Erreur');
        });
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
        this.loggingService.log("Toggle to: ", $event.value);
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
                this.loggingService.log("Unknown Bundle");
        }

    }

    onSelectPackage($event: any) {
        // this.loggingService.log("Package Event", $event);
        const id = $event.value; // this.addForm.controls["package"].value;
        this.loggingService.log("Selection:",$event.value);

        this.selectedPackageId = id;
        if(id != this.addForm.controls["package"].value)
            this.addForm.controls["package"].setValue(id);
        if(id != this.packageForm.controls["package"].value)
            this.packageForm.controls["package"].setValue(id);
        if(id != this.bundleForm.controls["package"].value)
            this.bundleForm.controls["package"].setValue(id);
        const pkg = this.packages.find(o => o.id === id);
        this.loggingService.log("Selected Package:", pkg);

        if(pkg){
            this.line.packageId = pkg.id;
            this.selectedPackage = pkg;
            if(pkg.isOfficial){
                this.addForm.controls["packageCost"].setValue(pkg.officialCredits);
                this.addForm.controls["duration"].setValue(pkg.officialDuration);
                const expiration = PackageService.getPackageExpirationDate(pkg.officialDuration, pkg.officialDurationIn);
                // this.loggingService.log("Official Expiration :", expiration);
                this.addForm.controls["expirationDate"].setValue(this.formatDateTime(expiration));
            }else{
                this.addForm.controls["packageCost"].setValue(pkg.trialCredits);
                this.addForm.controls["duration"].setValue(pkg.trialDuration);
                const expiration = PackageService.getPackageExpirationDate(pkg.trialDuration, pkg.trialDurationIn);
                // this.loggingService.log("Trial Expiration :", expiration);
                this.addForm.controls["expirationDate"].setValue(this.formatDateTime(expiration));
            }
            if(this.selectedBundleOption === 'packages')
                this.line.bouquets = pkg.bouquets;
            this.line.isIsplock = pkg.isIsplock;
            this.line.isE2 = pkg.isE2;
            this.line.forcedCountry = pkg.forcedCountry;
        }
        else
            this.loggingService.log(`Ops!! Package[${id}] not found`);

        // this.loggingService.log("Select Package", this.selectedPackage);
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
