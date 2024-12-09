import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {finalize} from 'rxjs';
import {Params} from 'src/app/shared/models/params';
import {ParamsService} from 'src/app/shared/services/params.service';
import {LoggingService} from "../../../../../../services/logging.service";

@Component({
    selector: 'app-vpn-params',
    templateUrl: './vpn-params.component.html',
    styleUrl: './vpn-params.component.scss'
})
export class VpnParamsComponent implements OnInit {
    loading: boolean = false;

    dnsToAdd: string = '';
    dnsToEdit: string = '';

    editableDNSIndex: number | null;

    param: Params;

    // @Output()
    // saveChanges = new EventEmitter<void>();

    onSaveChanges() {
        this.loading = true;
        if (this.param && this.param.id) {
            this.paramsService.updateParam(this.param).pipe(finalize(() => this.loading = false)).subscribe(param => {
                this.param = param
            });
        } else {
            this.paramsService.addParam(this.param).pipe(finalize(() => this.loading = false)).subscribe(param => {
                this.param = param
            });

        }

        // Emit the event when save is clicked
        // this.saveChanges.emit();
    }

    constructor(
        private paramsService: ParamsService,
        private loggingService: LoggingService
    ) {
        this.param = this.initParam;
    }

    ngOnInit(): void {
        this.loading = true;
        this.paramsService.getParamByKey('vpn').pipe(finalize(() => this.loading = false)).subscribe(param => {
            this.loggingService.log("Fetched VPN Param", param);

            this.param = param;
            this.loggingService.log("Fetched Param:", this.param);

            this.loggingService.log("DNS List:", this.defaultDNSList);

        })
    }

    isOver(): boolean {
        return window.matchMedia(`(max-width: 960px)`).matches;
    }


    addDNS(): void {
        if (!this.dnsToAdd)
            return;

        const vpn = this.defaultVPN;
        vpn.dns.push(this.dnsToAdd);
        this.param.value = [vpn];
        this.dnsToAdd = '';
    }


    editDNS(index: number, str: string): void {
        this.editableDNSIndex = index;
        this.dnsToEdit = this.defaultDNSList[index];
    }

    saveDNS(index: number): void {
        // After editing the DNS, reset the editable state
        this.editableDNSIndex = null;
        this.defaultVPN.dns[index] = this.dnsToEdit; // Update the DNS at the given index
        this.dnsToEdit = ''; // Clear the input
    }

    deleteDNS(index: number): void {
        // Remove the DNS at the given index
        this.defaultVPN.dns.splice(index, 1);
        if (this.editableDNSIndex !== null)
            this.dnsToEdit = this.defaultDNSList[index];
    }

    get canAddDNS(): boolean {
        return this.dnsToAdd.length > 0;
    }

    get initParam(): Params {
        return {
            id: 0,
            title: 'VPN',
            description: 'VPN Configurations',
            key: 'vpn',
            value: [{region: 'default', dns: []}],
            module_name: '',
            type: 'object',
            createAt: new Date(),
            updatedAt: new Date()
        }
    }

    get defaultDNSList(): string[] {
        return this.defaultVPN.dns || [];
    }

    get defaultVPN(): any {
        return [...this.param?.value || []].find((vpn: any) => vpn.region === 'default') || {};
    }
}
