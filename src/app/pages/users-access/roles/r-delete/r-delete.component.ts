import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoleService} from "../../../../core/service/role.service";
import {Role} from "../../../../core/interfaces/role";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {IFormType} from "../../../../core/interfaces/formType";

@Component({
    selector: 'app-r-delete',
    templateUrl: './r-delete.component.html',
    styleUrls: ['./r-delete.component.scss']
})
export class RDeleteComponent implements OnInit {
    constructor(
        private roleService: RoleService,
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
    entityElm: IFormType = {label: 'Rôle', entity: 'role'}

    ngOnInit(): void {
        if (confirm('Voulez vous procèder à la suppression de cet entrée ?')) {
            let id = Number(this.activated.snapshot.paramMap.get('id'));
            if (id) {
                this.roleService.getRole(id)?.subscribe(
                    (data: Role) => {
                        if (data) {
                            this.roleService.deleteRole(data.id).subscribe(
                                () => {
                                    this.successSwal.fire().then(() => {
                                        this.router.navigate(['users-access/' + this.entityElm.entity + 's'])
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
            this.router.navigate(['users-access/' + this.entityElm.entity + 's'])
        }
    }
}
