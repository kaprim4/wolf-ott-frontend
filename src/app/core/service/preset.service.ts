import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../interfaces/formType';
import { IPreset } from '../interfaces/ipreset';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PresetService extends BaseService<IPreset> {
  constructor(
      httpClient: HttpClient,
      tokenService: TokenService
  ) {
      super(httpClient, tokenService);
      this.endpoint = "presets";
  }

}
