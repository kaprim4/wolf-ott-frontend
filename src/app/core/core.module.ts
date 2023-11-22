import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {Title} from '@angular/platform-browser';
import {ErrorInterceptor} from './helpers/error.interceptor';
import {TokenInterceptor} from './helpers/token.interceptor';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
    ],
    providers: [
        Title,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
    ],
    exports: []
})
export class CoreModule {

}
