import {Component, OnInit} from '@angular/core';
import {IFormType} from "../../../../core/interfaces/formType";
import {IUser} from "../../../../core/interfaces/user";
import {EventType} from "../../../../core/constants/events";
import {EventService} from "../../../../core/service/event.service";
import {UserService} from "../../../../core/service/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-u-add',
    templateUrl: './u-add.component.html',
    styleUrls: ['./u-add.component.scss']
})
export class UAddComponent implements OnInit {

    entityElm: IFormType = {
        label: 'Utilisateur',
        entity: 'user'
    }
    loading: boolean = false;
    error: string = '';
    title: string = 'Nouvelle entrée' + (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');
    user: IUser | null = null;

    constructor(
        private eventService: EventService,
        private userService: UserService,
        private activated: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Liste des utilisateurs",
            breadCrumbItems: [
                {label: 'Utilisateurs & Accès', path: '.'},
                {label: 'Liste des utilisateurs', path: '.', active: true}
            ]
        });
        this.loading = true;
        this._fetchData();
    }

    onSubmit() {
        return false;
    }

    private _fetchData() {
        let uid = Number(this.activated.snapshot.paramMap.get('uid'))
        this.userService.getUser(uid)?.subscribe(
            (data: IUser) => {
                console.log("data", data);
                if (data) {
                    this.user = data;
                    this.loading = false;
                } else {
                    this.error = "Utilisateur introuvable.";
                }
            }
        );
    }
}
