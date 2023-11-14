import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SupervisorService} from "../../../../core/service/supervisor.service";
import {Supervisor} from "../../../../core/interfaces/supervisor";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {IFormType} from "../../../../core/interfaces/formType";

@Component({
    selector: 'app-sp-delete',
    templateUrl: './sp-delete.component.html',
    styleUrls: ['./sp-delete.component.scss']
})
export class SpDeleteComponent implements OnInit {
    constructor(
        private supervisorService: SupervisorService,
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
    entityElm: IFormType = {label: 'Superviseur', entity: 'supervisor'}

    ngOnInit(): void {
        if (confirm('Voulez vous procèder à la suppression de cet entrée ?')) {
            let id = Number(this.activated.snapshot.paramMap.get('id'));
            if (id) {
                this.supervisorService.getSupervisor(id)?.subscribe(
                    (data: Supervisor) => {
                        if (data) {
                            this.supervisorService.deleteSupervisor(data.id).subscribe(
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
                    }
                );

            } else {
                this.loading = false;
                this.error = this.entityElm.label + " introuvable.";
            }
        } else {
            console.log("Action annulée.")
            this.router.navigate(['dictionnary/' + this.entityElm.entity + 's'])
        }
    }
}
