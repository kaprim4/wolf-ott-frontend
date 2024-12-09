import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {TokenService} from "../shared/services/token.service";
import {ApiErrorService} from "../shared/services/api-error.service";
import {LoggingService} from "../services/logging.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private tokenService: TokenService,
        private apiErrorService: ApiErrorService,
        private loggingService: LoggingService
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.loggingService.log(request)
        const token = this.tokenService.getToken()
        // SI token à insérer dans le header
        if (token !== null) {
            let clone = request.clone({
                headers: request.headers.set('Authorization', 'bearer ' + token)
            })
            //this.loggingService.log("clone:", clone)
            return next.handle(clone).pipe(
                catchError(error => {
                    this.loggingService.log(error)
                    if (error.status === 401) {
                        this.tokenService.clearTokenExpired()
                    }
                    this.apiErrorService.sendError(error.error.message)
                    return throwError('Session Expired')
                })
            )
        }
        return next.handle(request);
    }
}

export const TokenInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
}
