import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LineList } from 'src/app/shared/models/line';
import { Patch } from 'src/app/shared/models/patch';
import { LineService } from 'src/app/shared/services/line.service';

@Component({
  selector: 'app-wolf-guard-dialog',
  templateUrl: './wolf-guard-dialog.component.html',
  styleUrl: './wolf-guard-dialog.component.scss'
})
export class WolfGuardDialogComponent {

  active: boolean = false;
  line: LineList;

  constructor(private toastr: ToastrService, 
              private lineService: LineService,
              public dialogRef: MatDialogRef<WolfGuardDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: {line:LineList})
  {
    this.line = data.line;
  }

  toggleVpn(){
    const id = this.line.id;
    const patch:Patch = {
      op: 'replace',
      path: '/useVPN',
      value: this.line.useVPN
    }
    this.lineService.patch(id, patch).subscribe(line => {
      console.log("Line updated successfuly", line);
      
    })
  }

  refreshVPN(){
    const id = this.line.id;
    this.lineService.refreshVPN(id).subscribe(line => {
      console.log("Line VPN changed successfuly", line);
    })
  }
}
