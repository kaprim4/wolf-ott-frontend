import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LineList } from 'src/app/shared/models/line';

@Component({
  selector: 'app-wolf-guard-dialog',
  templateUrl: './wolf-guard-dialog.component.html',
  styleUrl: './wolf-guard-dialog.component.scss'
})
export class WolfGuardDialogComponent {

  active: boolean = false;
  line: LineList;

  constructor(private toastr: ToastrService, public dialogRef: MatDialogRef<WolfGuardDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {line:LineList})
  {
    this.line = data.line;
  }
}
