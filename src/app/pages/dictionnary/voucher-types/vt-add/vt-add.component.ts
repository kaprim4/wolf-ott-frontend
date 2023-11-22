import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {EventService} from "../../../../core/service/event.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IFormType} from "../../../../core/interfaces/formType";
import {InputProps, InputPropsTypesEnum} from "../../../../core/interfaces/input_props";
import * as moment from "moment/moment";
import {now} from "moment/moment";
import {EventType} from "../../../../core/constants/events";
import {HttpErrorResponse, HttpEventType, HttpResponse} from "@angular/common/http";
import {FileUploadService} from "../../../../core/service/file-upload.service";
import {Observable} from "rxjs";
import {VoucherType} from "../../../../core/interfaces/voucher";
import {VoucherTypeService} from "../../../../core/service/voucher-type.service";

@Component({
    selector: 'app-vt-add',
    templateUrl: './vt-add.component.html',
    styleUrls: ['./vt-add.component.scss']
})
export class VtAddComponent implements OnInit {

    @Input()
    voucherType: VoucherType = {
        createdAt: "",
        id: 0,
        imageName: "",
        isActivated: false,
        isDeleted: false,
        libelle: "",
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
        private fb: FormBuilder,
        private uploadService: FileUploadService
    ) {
    }

    entityElm: IFormType = {
        label: 'Superviseur',
        entity: 'supervisor'
    }
    title: string = 'Nouvelle entrée' + (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');
    objectProps: InputProps[] = [];

    addForm: FormGroup = this.fb.group({
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
    }

    private updateFormValues() {
        this.voucherType = {
            id: this.addForm.controls['id'].value,
            libelle: this.addForm.controls['libelle'].value,
            imageName: this.addForm.controls['imageName'].value,
            isActivated: this.addForm.controls['isActivated'].value,
            isDeleted: false,
            createdAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
            updatedAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
        }
    }

    get formValues() {
        return this.addForm.controls;
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Liste des types de bon",
            breadCrumbItems: [
                {label: 'Dictionnaire', path: 'dictionnary'},
                {label: 'Liste des types de bon', path: 'dictionnary/voucher-types'},
                {label: 'Ajouter un type de bon', path: '.', active: true}
            ]
        });
        this.imageInfos = this.uploadService.getFiles();
        this.initFieldsConfig();
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
                    console.log(e.target.result);
                    this.previews.push(e.target.result);
                };

                reader.readAsDataURL(this.selectedFiles[i]);
            }
        }
    }

    upload(idx: number, file: File): void {
        this.progressInfos[idx] = {
            value: 0,
            fileName: file.name
        };

        if (file) {
            this.uploadService.upload(file).subscribe({
                next: (event: any) => {
                    if (event.type === HttpEventType.UploadProgress) {
                        this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
                    } else if (event instanceof HttpResponse) {
                        const msg = 'Uploaded the file successfully: ' + file.name;
                        this.message.push(msg);
                        this.imageInfos = this.uploadService.getFiles();
                    }
                },
                error: (err: any) => {
                    this.progressInfos[idx].value = 0;
                    const msg = 'Could not upload the file: ' + file.name;
                    this.message.push(msg);
                }
            });
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

    async onSubmit() {
        this.formSubmitted = true;
        if (this.addForm.valid) {
            this.loading = true;
            this.updateFormValues();
            console.log(this.voucherType);
            if (this.voucherType) {
                this.voucherTypeService.addVoucherType(this.voucherType).subscribe(
                    (data: HttpResponse<any>) => {
                        if (data.status === 200 || data.status === 202) {
                            console.log(`Got a successfull status code: ${data.status}`);
                        }
                        if (data.body) {
                            this.successSwal.fire().then(() => {
                                this.router.navigate(['dictionnary/' + this.entityElm.entity + 's'])
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
                )
            } else {
                this.errorSwal.fire().then(r => this.loading = false);
            }
        }
    }
}
