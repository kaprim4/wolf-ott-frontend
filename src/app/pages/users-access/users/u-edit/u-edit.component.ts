import {Component, Input, OnInit} from '@angular/core';
import {IFormType} from "../../../../core/interfaces/formType";
import {IUser} from "../../../../core/interfaces/user";
import {EventService} from "../../../../core/service/event.service";
import {UserService} from "../../../../core/service/user.service";
import {ActivatedRoute} from "@angular/router";
import {EventType} from "../../../../core/constants/events";
import {GasStation} from "../../../../core/interfaces/gas_station";
import {Role} from "../../../../core/interfaces/role";
import {InputProps, InputPropsTypesEnum} from "../../../../core/interfaces/input_props";
import {GasStationService} from "../../../../core/service/gas-station.service";
import {RoleService} from "../../../../core/service/role.service";

@Component({
  selector: 'app-u-edit',
  templateUrl: './u-edit.component.html',
  styleUrls: ['./u-edit.component.scss']
})
export class UEditComponent implements OnInit {

    entityElm: IFormType = {
        label: 'Utilisateur',
        entity: 'user'
    }
    loading: boolean = false;
    error: string = '';
    title: string = 'Nouvelle entrée' + (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');

    @Input()
    user: IUser = {
        id: 0,
        role: null,
        gasStation: null,
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        isActivated: false,
        isDeleted: false,
        createdAt: "",
        updatedAt: ""
    }

    gasStationList: GasStation[] = [];
    roleList: Role[] = [];

    userprops: InputProps[] = [];

    constructor(
        private eventService: EventService,
        private userService: UserService,
        private gasStationService: GasStationService,
        private roleService: RoleService,
        private activated: ActivatedRoute
    ) {
    }

    initFieldsConfig(): void {
        this.userprops = [
            {
                input: 'role',
                label: 'Rôle',
                type: InputPropsTypesEnum.S,
                value:this.user.role?.id,
                joinTable: this.roleList,
                joinTableId: 'id',
                joinTableIdLabel: 'libelle'
            },
            {
                input: 'gasStation',
                label: 'Station',
                type: InputPropsTypesEnum.S,
                value:this.user.gasStation?.id,
                joinTable: this.gasStationList,
                joinTableId: 'id',
                joinTableIdLabel: 'libelle'
            },
            {
                input: 'firstName',
                label: 'Nom',
                type: InputPropsTypesEnum.T,
                value:this.user.firstName,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'lastName',
                label: 'Prénom',
                type: InputPropsTypesEnum.T,
                value:this.user.lastName,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'email',
                label: 'E-mail',
                type: InputPropsTypesEnum.E,
                value:this.user.email,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'username',
                label: 'Identifiant',
                type: InputPropsTypesEnum.T,
                value:this.user.username,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'password',
                label: 'Mot de passe',
                type: InputPropsTypesEnum.P,
                value:this.user.password,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'isActivated',
                label: 'Est-t-il activé ?',
                type: InputPropsTypesEnum.C,
                value:this.user.isActivated,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
        ]
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
        this._fetchGasStationData();
        this._fetchRoleData();
    }

    onSubmit() {
        return false;
    }

    private _fetchData() {
        let id = Number(this.activated.snapshot.paramMap.get('id'));
        if(id){
            this.userService.getUser(id)?.subscribe(
                (data: IUser) => {
                    if (data) {
                        this.user = data;
                        this.loading = false;
                    }
                }
            );
        }else{
            this.loading = false;
            this.error = "Utilisateur introuvable.";
        }
    }

    private _fetchGasStationData() {
        this.gasStationService.getGasStations()?.subscribe(
            (data) => {
                if (data) {
                    this.gasStationList = data;
                    this.initFieldsConfig();
                }
            }
        );
    }

    private _fetchRoleData() {
        this.roleService.getRoles()?.subscribe(
            (data) => {
                if (data) {
                    this.roleList = data;
                    this.initFieldsConfig();
                }
            }
        );
    }
}
