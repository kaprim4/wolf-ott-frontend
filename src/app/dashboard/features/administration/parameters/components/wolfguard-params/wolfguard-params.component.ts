import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { LoggingService } from 'src/app/services/logging.service';
import { Params } from 'src/app/shared/models/params';
import { ParamsService } from 'src/app/shared/services/params.service';

@Component({
  selector: 'app-wolfguard-params',
  templateUrl: './wolfguard-params.component.html',
  styleUrl: './wolfguard-params.component.scss'
})
export class WolfguardParamsComponent {
  loading: boolean = false;
  description:string = 'Hello, World!';

  param: Params;

  // @Output()
  // saveChanges = new EventEmitter<void>();

  onSaveChanges() {
      this.loading = true;
      if (this.param && this.param.id) {
          this.paramsService.updateParam(this.param).pipe(finalize(() => this.loading = false)).subscribe(param => {
              this.param = param
          });
      } else {
          this.paramsService.addParam(this.param).pipe(finalize(() => this.loading = false)).subscribe(param => {
              this.param = param
          });

      }

      // Emit the event when save is clicked
      // this.saveChanges.emit();
  }

  constructor(
      private paramsService: ParamsService,
      private loggingService: LoggingService
  ) {
      this.param = this.initParam;
  }

  ngOnInit(): void {
      this.loading = true;
      this.paramsService.getParamByKey('wolf-guard').pipe(finalize(() => this.loading = false)).subscribe(param => {
          this.loggingService.log("Fetched WolfGuard Param", param);

          this.param = param;
          this.loggingService.log("Fetched Param:", this.param);

      })
  }

  get initParam(): Params {
      return {
          id: 0,
          title: 'WolfGurard Config',
          description: 'WolfGurard VPN Configurations',
          key: 'wolf-guard',
          value: [{description: ''}],
          module_name: '',
          type: 'object',
          createAt: new Date(),
          updatedAt: new Date()
      }
  }

}
