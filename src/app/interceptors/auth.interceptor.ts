import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { InterceptorSkipHeader } from '../services/http.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (request.headers.has(InterceptorSkipHeader)) {
            const headers = request.headers.delete(InterceptorSkipHeader);
            let clonedRequest = request.clone({ headers });

            return next.handle(clonedRequest);
        }
        else {
            const token = this.authService.getToken();
            
            let clonedRequest = request.clone({
                headers: new HttpHeaders({ "Authorization": token })
            });

            return next.handle(clonedRequest);
        }
    }
}

export const authInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }];