import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {EventService} from "../../../../core/service/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IFormType} from "../../../../core/interfaces/formType";
import {InputProps, InputPropsTypesEnum} from "../../../../core/interfaces/input_props";
import {HttpErrorResponse, HttpEventType, HttpResponse} from "@angular/common/http";
import {EventType} from "../../../../core/constants/events";
import * as moment from "moment";
import {now} from "moment";
import {VoucherType} from "../../../../core/interfaces/voucher";
import {VoucherTypeService} from "../../../../core/service/voucher-type.service";
import {Observable} from "rxjs";
import {FileUploadService} from "../../../../core/service/file-upload.service";
import {formatBytes} from "../../../../core/helpers/functions";

@Component({
    selector: 'app-vt-edit',
    templateUrl: './vt-edit.component.html',
    styleUrls: ['./vt-edit.component.scss']
})
export class VtEditComponent implements OnInit {

    @Input()
    voucherType: VoucherType = {
        id: 0,
        libelle: "",
        file: null,
        isActivated: false,
        isDeleted: false,
        createdAt: "",
        updatedAt: ""
    }

    @ViewChild('successSwal')
    public readonly successSwal!: SwalComponent;

    @ViewChild('errorSwal')
    public readonly errorSwal!: SwalComponent;

    constructor(
        private eventService: EventService,
        private voucherTypeService: VoucherTypeService,
        private router: Router,
        private activated: ActivatedRoute,
        private fb: FormBuilder,
        private uploadService: FileUploadService
    ) {
    }

    entityElm: IFormType = {
        label: 'Type de bon',
        entity: 'supervisor'
    }
    title: string = 'Modifier cette entrée' + (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');
    objectProps: InputProps[] = [];

    editForm: FormGroup = this.fb.group({
        id: [this.voucherType.id],
        libelle: ['', Validators.required],
        imageName: ['', Validators.required],
        isActivated: [false]
    });
    formSubmitted: boolean = false;
    error: string = '';
    loading: boolean = false;
    selectedFiles?: FileList;
    progressInfos: any[] = [];
    message: string[] = [];

    previews: string[] = [];
    imageInfos?: Observable<any>;
    fileDb: any = null;


    initFieldsConfig(): void {
        this.objectProps = [
            {
                input: 'libelle',
                label: 'Nom',
                type: InputPropsTypesEnum.T,
                value: this.voucherType.libelle,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'isActivated',
                label: 'Est-t-il activé ?',
                type: InputPropsTypesEnum.C,
                value: this.voucherType.isActivated,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
        ];
        this.editForm = this.fb.group({
            id: [this.voucherType.id],
            libelle: [this.voucherType.libelle, Validators.required],
            isActivated: [this.voucherType.isActivated]
        });
    }

    private _fetchData() {
        let id = Number(this.activated.snapshot.paramMap.get('id'));
        if (id) {
            this.voucherTypeService.getVoucherType(id)?.subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        console.log(`Got a successfull status code: ${data.status}`);
                    }
                    if (data.body) {
                        this.voucherType = data.body;
                        if(this.voucherType.file){
                            let imageName: string | null = "./assets/images/no_image.png";
                            if (this.voucherType.file && this.voucherType.file?.id) {
                                imageName = `data:${this.voucherType.file?.imageType};base64,${this.voucherType.file?.imageData}`;
                                this.previews.push(imageName);
                            }
                        }
                        this.loading = false;
                        this.initFieldsConfig();
                    }
                    console.log('This contains body: ', data.body);
                },
                (err: HttpErrorResponse) => {
                    if (err.status === 403 || err.status === 404) {
                        console.error(`${err.status} status code caught`);
                    }
                }
            );
        } else {
            this.loading = false;
            this.error = "Type de bon introuvable.";
        }
    }

    get formValues() {
        return this.editForm.controls;
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Liste des types de bon",
            breadCrumbItems: [
                {label: 'Dictionnaire', path: 'dictionnary'},
                {label: 'Liste des types de bon', path: 'dictionnary/voucher-types'},
                {label: 'Modifier un type de bon', path: '.', active: true}
            ]
        });
        this.loading = true;
        this.imageInfos = this.uploadService.getFiles();
        this._fetchData();
    }

    selectFiles(event: any): void {
        this.message = [];
        this.progressInfos = [];
        this.selectedFiles = event.target.files;
        this.previews = [];
        if (this.selectedFiles && this.selectedFiles[0]) {
            const numberOfFiles = this.selectedFiles.length;
            for (let i = 0; i < numberOfFiles; i++) {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.previews.push(e.target.result);
                };
                reader.readAsDataURL(this.selectedFiles[i]);
            }
        }
    }

    uploadFiles(): void {
        this.message = [];
        if (this.selectedFiles) {
            for (let i = 0; i < this.selectedFiles.length; i++) {
                this.upload(i, this.selectedFiles[i]);
            }
        }
    }

    upload(idx: number, file: File): void {
        this.progressInfos[idx] = {
            value: 0,
            fileName: file.name,
            fileSize: formatBytes(file.size)
        };
        if (file) {
            this.uploadService.upload(file).subscribe(
                (event: any) => {
                    if (event.type === HttpEventType.UploadProgress) {
                        this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
                    } else if (event instanceof HttpResponse) {
                        if (event.status === 200 || event.status === 202) {
                            console.log(`Got a successfull status code: ${event.status}`);
                        }
                        if (event.body) {
                            this.fileDb = event.body;
                            this.message = [];
                            this.selectedFiles = undefined;
                        }
                        console.log('This contains body: ', event.body);
                        const msg = 'Le fichier a été téléchargé avec succès: ' + file.name;
                        this.message.push(msg);
                        this.imageInfos = this.uploadService.getFiles();
                    }
                },
                (err: any) => {
                    this.progressInfos[idx].value = 0;
                    const msg = 'Impossible de télécharger le fichier: ' + file.name;
                    this.message.push(msg);
                }
            );
        }
    }

    async onSubmit() {
        this.formSubmitted = true;
        if (this.editForm.valid) {
            this.loading = true;

            console.log("fileDb: ",this.fileDb);

            this.voucherType.id = this.editForm.controls['id'].value;
            this.voucherType.libelle = this.editForm.controls['libelle'].value;
            this.voucherType.file = this.fileDb;
            this.voucherType.isActivated = this.editForm.controls['isActivated'].value;
            this.voucherType.isDeleted = false;
            this.voucherType.createdAt = moment(now()).format('Y-M-DTHH:mm:ss').toString();
            this.voucherType.updatedAt = moment(now()).format('Y-M-DTHH:mm:ss').toString();
            console.log(this.voucherType);

            if (this.voucherType) {
                this.voucherTypeService.updateVoucherType(this.voucherType).subscribe(
                    (data: HttpResponse<any>) => {
                        if (data.status === 200 || data.status === 202) {
                            console.log(`Got a successfull status code: ${data.status}`);
                        }
                        if (data.body) {
                            this.successSwal.fire().then(() => {
                                this.router.navigate(['dictionnary/voucher-types'])
                            });
                        }
                        console.log('This contains body: ', data.body);
                    },
                    (err: HttpErrorResponse) => {
                        if (err.status === 403 || err.status === 404) {
                            console.error(`${err.status} status code caught`);
                            this.errorSwal.fire().then((r) => {
                                this.error = err.message;
                                console.log(err.message);
                            });
                        }
                    },
                    (): void => {
                        this.loading = false;
                    }
                );
            } else {
                this.errorSwal.fire().then(r => this.loading = false);
            }
        }
    }

    protected readonly formatBytes = formatBytes;
}
