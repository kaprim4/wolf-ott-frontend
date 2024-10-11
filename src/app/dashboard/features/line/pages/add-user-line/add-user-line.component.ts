import { Component } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { order } from 'src/app/pages/apps/invoice/invoice';
import { UserDialogComponent } from '../../../user/pages/user-dialog/user-dialog.component';
import { LineService } from 'src/app/shared/services/line.service';
import { LineDetail } from 'src/app/shared/models/line';

@Component({
  selector: 'app-add-user-line',
  templateUrl: './add-user-line.component.html',
  styleUrls: ['./add-user-line.component.scss']
})
export class AddUserLineComponent {
  
  addForm: UntypedFormGroup;
  line: LineDetail;

  subTotal = 0;
  vat = 0;
  grandTotal = 0;

  constructor(
    private fb: UntypedFormBuilder,
    private lineService: LineService,
    private router: Router,
    public dialog: MatDialog
  ) {
    // Initialize the line object
    this.line = {
      id: 0,
      memberId: 0,
      username: '',
      password: '',
      lastIp: '',
      expDate: 0,
      adminEnabled: false,
      enabled: true,
      adminNotes: null,
      resellerNotes: null,
      bouquet: '',
      allowedOutputs: '',
      maxConnections: 1,
      isRestreamer: false,
      isTrial: false,
      isMag: false,
      isE2: false,
      isStalker: false,
      isIsplock: false,
      allowedIps: '[]',
      allowedUa: '[]',
      createdAt: 0,
      pairId: null,
      forceServerId: 0,
      asNumber: '',
      ispDesc: '',
      forcedCountry: '',
      bypassUa: false,
      playToken: null,
      lastExpirationVideo: null,
      packageId: null,
      accessToken: null,
      contact: null,
      lastActivity: 0,
      lastActivityArray: '',
      updated: null
    };

    this.addForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      owner: ['', Validators.required],
      package: ['', Validators.required],
      packageCost: [null, Validators.required],
      duration: ['', Validators.required],
      maxConnections: [1, Validators.required],
      expirationDate: ['', Validators.required],
      contact: ['', [Validators.required, Validators.email]],
      resellerNotes: ['']
    });
  }

  saveDetail(): void {
    if (this.addForm.valid) {
      // Populate the line object with form values
      this.line.username = this.addForm.get('username')?.value;
      this.line.password = this.addForm.get('password')?.value;
      this.line.adminNotes = this.addForm.get('owner')?.value;
      // Add more properties as needed

      // Call the service to add the line
      this.lineService.addLine(this.line);
      this.dialog.open(UserDialogComponent);
      this.router.navigate(['/apps/lines/users']);
    } else {
      // Handle form errors
      console.error('Form is invalid');
    }
  }
}
