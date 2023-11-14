import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {UserService} from "../../../../core/service/user.service";
import {IUser} from "../../../../core/interfaces/user";
import {IFormType} from "../../../../core/interfaces/formType";

@Component({
  selector: 'app-u-delete',
  templateUrl: './u-delete.component.html',
  styleUrls: ['./u-delete.component.scss']
})
export class UDeleteComponent implements OnInit {

    constructor(
        private userService: UserService,
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
    entityElm: IFormType = {label: 'Utilisateur', entity: 'user'}

    ngOnInit(): void {
        if (confirm('Voulez vous procèder à la suppression de cet entrée ?')) {
            let id = Number(this.activated.snapshot.paramMap.get('id'));
            if (id) {
                this.userService.getUser(id)?.subscribe(
                    (data: IUser) => {
                        if (data) {
                            this.userService.deleteUser(data.id)?.subscribe(
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
