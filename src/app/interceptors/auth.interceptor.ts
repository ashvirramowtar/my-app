import { HttpEvent, HttpRequest, HttpHeaders, HttpHandlerFn, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { InterceptorSkipHeader } from '../services/http.service';

export function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    if (request.headers.has(InterceptorSkipHeader)) {
        const headers = request.headers.delete(InterceptorSkipHeader);
        let clonedRequest = request.clone({ headers });
        
        return next(clonedRequest);
    }
    else {
        const token = localStorage.getItem("token");
        
        let clonedRequest = request.clone({
            headers: new HttpHeaders({ "Authorization": token })
        });
    
        return next(clonedRequest);
    }
}