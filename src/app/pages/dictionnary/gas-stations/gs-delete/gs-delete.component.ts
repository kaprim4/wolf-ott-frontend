import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {IFormType} from "../../../../core/interfaces/formType";
import {Role} from "../../../../core/interfaces/role";
import {GasStationService} from "../../../../core/service/gas-station.service";
import {GasStation} from "../../../../core/interfaces/gas_station";

@Component({
  selector: 'app-gs-delete',
  templateUrl: './gs-delete.component.html',
  styleUrls: ['./gs-delete.component.scss']
})
export class GsDeleteComponent implements OnInit {

    constructor(
        private gasStationService: GasStationService,
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
    entityElm: IFormType = {label: 'Station-service', entity: 'gas-station'}

    ngOnInit(): void {
        if (confirm('Voulez vous procèder à la suppression de cet entrée ?')) {
            let id = Number(this.activated.snapshot.paramMap.get('id'));
            if (id) {
                this.gasStationService.getGasStation(id)?.subscribe(
                    (data: GasStation) => {
                        if (data) {
                            this.gasStationService.deleteGasStation(data.id).subscribe(
                                () => {
                                    this.successSwal.fire().then(() => {
                                        this.router.navigate(['dictionnary/' + this.entityElm.entity + 's'])
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
                    },
                    (error: string) => {
                        this.errorSwal.fire().then((r) => {
                            this.error = this.entityElm.label + " introuvable.";
                            console.log(error);
                        });
                    }
                );
            } else {
                this.loading = false;
                this.error = "Identifiant introuvable.";
            }
        } else {
            console.log("Action annulée.")
            this.router.navigate(['dictionnary/' + this.entityElm.entity + 's'])
        }
    }

}
