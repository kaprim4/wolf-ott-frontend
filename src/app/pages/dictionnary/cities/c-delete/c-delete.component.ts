import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CityService} from "../../../../core/service/city.service";
import {City} from "../../../../core/interfaces/city";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {IFormType} from "../../../../core/interfaces/formType";

@Component({
    selector: 'app-c-delete',
    templateUrl: './c-delete.component.html',
    styleUrls: ['./c-delete.component.scss']
})
export class CDeleteComponent implements OnInit {
    constructor(
        private cityService: CityService,
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
    entityElm: IFormType = {label: 'Société', entity: 'city'}

    ngOnInit(): void {
        if (confirm('Voulez vous procèder à la suppression de cet entrée ?')) {
            let id = Number(this.activated.snapshot.paramMap.get('id'));
            if (id) {
                this.cityService.getCity(id)?.subscribe(
                    (data: City) => {
                        if (data) {
                            this.cityService.deleteCity(data.id).subscribe(
                                () => {
                                    this.successSwal.fire().then(() => {
                                        this.router.navigate(['dictionnary/cities'])
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
            this.router.navigate(['dictionnary/cities'])
        }
    }
}
