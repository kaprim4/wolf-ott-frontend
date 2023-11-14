import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RegionService} from "../../../../core/service/region.service";
import {Region} from "../../../../core/interfaces/region";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {IFormType} from "../../../../core/interfaces/formType";

@Component({
    selector: 'app-rg-delete',
    templateUrl: './rg-delete.component.html',
    styleUrls: ['./rg-delete.component.scss']
})
export class RgDeleteComponent implements OnInit {
    constructor(
        private regionService: RegionService,
        private activated: ActivatedRoute,
        private router: Router,
    ) {
    }

    @ViewChild('successSwal')
    public readonly successSwal!: SwalComponent;

    @ViewChild('errorSwal')
    public readonly errorSwal!: SwalComponent;

    error: string = '';
    loading: boolean = false;
    entityElm: IFormType = {label: 'Région', entity: 'region'}

    ngOnInit(): void {
        if (confirm('Voulez vous procèder à la suppression de cet entrée ?')) {
            let id = Number(this.activated.snapshot.paramMap.get('id'));
            if (id) {
                this.regionService.getRegion(id)?.subscribe(
                    (data: Region) => {
                        if (data) {
                            this.regionService.deleteRegion(data.id).subscribe(
                                () => {
                                    this.successSwal.fire().then(() => {
                                        this.router.navigate(['dictionnary/regions'])
                                    });
                                },
                                (error: string) => {
                                    this.errorSwal.fire().then((r) => {
                                        this.error = error;
                                        console.log(error);
                                    });
                                },
                                (): void => {
                                    this.loading = false;
                                }
                            )
                        }
                    }
                );

            } else {
                this.loading = false;
                this.error = this.entityElm.label + " introuvable.";
            }
        } else {
            console.log("Action annulée.")
            this.router.navigate(['dictionnary/regions'])
        }
    }
}
