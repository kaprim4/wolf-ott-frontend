import {Component, OnInit} from '@angular/core';
import {UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {order} from 'src/app/pages/apps/invoice/invoice';
import {UserDialogComponent} from '../user-dialog/user-dialog.component';
import {UserService} from 'src/app/shared/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {UserDetail} from "../../../../../shared/models/user";

@Component({
    selector: 'app-view-user',
    templateUrl: './view-user.component.html',
    styleUrl: './view-user.component.scss'
})
export class ViewUserComponent implements OnInit {
    id: number;
    financialMetrics: any[] = [
        {
            color: 'primary',
            icon: 'account_balance', // Represents total credits
            title: '0',
            subtitle: 'Total Credits',
        },
        {
            color: 'warning',
            icon: 'shopping_cart', // Represents purchase cost
            title: '0',
            subtitle: 'Purchase Cost',
        },
        {
            color: 'accent',
            icon: 'wallet', // Represents remaining credits
            title: '0',
            subtitle: 'Remaining Credits',
        },
    ];


    userForm: UntypedFormGroup | any = {};
    rows: UntypedFormArray;
    user: UserDetail = {id: 0, username: ''};

    ///////////////////////////////////////////////////////////
    subTotal = 0;
    vat = 0;
    grandTotal = 0;

    constructor(
        private fb: UntypedFormBuilder,
        private userService: UserService,
        private router: Router,
        public dialog: MatDialog,
        private activatedRouter: ActivatedRoute
    ) {
        this.id = this.activatedRouter.snapshot.paramMap.get(
            'id'
        ) as unknown as number;
        this.initializeForm({id: this.id, username: ''})


    }

    ngOnInit(): void {
        this.userService.getUser<UserDetail>(this.id).subscribe(user => {
            this.user = user;
            this.initializeForm(user);
        })
    }

    initializeForm(user: UserDetail): void {
        this.userForm = this.fb.group({
            username: [user.username || '', Validators.required],
            email: [user.email || '', Validators.required], // Fix typo: eamil -> email
            password: [user.password || '', Validators.required],
            ownerId: [user.ownerId || '', Validators.required],
            resellerDns: [user.resellerDns || '', Validators.required],
            notes: [user.notes || '', Validators.required],
            duration: [0, Validators.required],
            rows: this.fb.array([]) // Initialize rows here
        });

        this.rows = this.userForm.get('rows') as UntypedFormArray;
        this.rows.push(this.createItemFormGroup());
    }


    onAddRow(): void {
        this.rows.push(this.createItemFormGroup());
    }

    onRemoveRow(rowIndex: number): void {
        const totalCostOfItem =
            this.userForm.get('rows')?.value[rowIndex].unitPrice *
            this.userForm.get('rows')?.value[rowIndex].units;

        this.subTotal = this.subTotal - totalCostOfItem;
        this.vat = this.subTotal / 10;
        this.grandTotal = this.subTotal + this.vat;
        this.rows.removeAt(rowIndex);
    }

    createItemFormGroup(): UntypedFormGroup {
        return this.fb.group({
            itemName: ['', Validators.required],
            units: ['', Validators.required],
            unitPrice: ['', Validators.required],
            itemTotal: ['0'],
        });
    }

    itemsChanged(): void {
        let total: number = 0;
        // tslint:disable-next-line - Disables all
        for (
            let t = 0;
            t < (<UntypedFormArray>this.userForm.get('rows')).length;
            t++
        ) {
            if (
                this.userForm.get('rows')?.value[t].unitPrice !== '' &&
                this.userForm.get('rows')?.value[t].units
            ) {
                total =
                    this.userForm.get('rows')?.value[t].unitPrice *
                    this.userForm.get('rows')?.value[t].units +
                    total;
            }
        }
        this.subTotal = total;
        this.vat = this.subTotal / 10;
        this.grandTotal = this.subTotal + this.vat;
    }

    ////////////////////////////////////////////////////////////////////

    saveDetail(): void {
        // tslint:disable-next-line - Disables all
        for (
            let t = 0;
            t < (<UntypedFormArray>this.userForm.get('rows')).length;
            t++
        ) {
            const o: order = new order();
            o.itemName = this.userForm.get('rows')?.value[t].itemName;
            o.unitPrice = this.userForm.get('rows')?.value[t].unitPrice;
            o.units = this.userForm.get('rows')?.value[t].units;
            o.unitTotalPrice = o.units * o.unitPrice;
        }
        this.dialog.open(UserDialogComponent);
        this.userService.addUser(this.user);
        this.router.navigate(['/apps/users']);
    }
}
