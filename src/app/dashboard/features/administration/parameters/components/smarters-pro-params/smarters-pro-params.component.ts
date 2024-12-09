import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {finalize} from 'rxjs';
import {Params} from 'src/app/shared/models/params';
import {ParamsService} from 'src/app/shared/services/params.service';
import {LoggingService} from "../../../../../../services/logging.service";

@Component({
    selector: 'app-smarters-pro-params',
    templateUrl: './smarters-pro-params.component.html',
    styleUrl: './smarters-pro-params.component.scss'
})
export class SmartersProParamsComponent implements OnInit {
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
        this.paramsService.getParamByKey('smarters_pro').pipe(finalize(() => this.loading = false)).subscribe(param => {
            this.loggingService.log("Fetched Smarters PRO Param", param);

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

        const smarters = this.defaultSmartersPRO;
        smarters.dns.push(this.dnsToAdd);
        this.param.value = [smarters];
        this.dnsToAdd = '';
    }


    editDNS(index: number, str: string): void {
        this.editableDNSIndex = index;
        this.dnsToEdit = this.defaultDNSList[index];

    }

    saveDNS(index: number): void {
        // After editing the DNS, reset the editable state
        this.editableDNSIndex = null;
        this.defaultSmartersPRO.dns[index] = this.dnsToEdit; // Update the DNS at the given index
        this.dnsToEdit = ''; // Clear the input
    }

    deleteDNS(index: number): void {
        // Remove the DNS at the given index
        this.defaultSmartersPRO.dns.splice(index, 1);
        if (this.editableDNSIndex !== null)
            this.dnsToEdit = this.defaultDNSList[index];
    }

    get canAddDNS(): boolean {
        return this.dnsToAdd.length > 0;
    }

    get initParam(): Params {
        return {
            id: 0,
            title: 'Smarters PRO',
            description: 'Smarters PRO Configurations',
            key: 'smarters_pro',
            value: [{region: 'default', dns: []}],
            module_name: '',
            type: 'list:object',
            createAt: new Date(),
            updatedAt: new Date()
        }
    }

    get defaultDNSList(): string[] {
        return this.defaultSmartersPRO.dns || [];
    }

    get defaultSmartersPRO(): any {
        return [...this.param?.value || []].find((smarters: any) => smarters.region === 'default') || {};
    }
}
