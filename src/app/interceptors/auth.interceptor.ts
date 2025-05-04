import { HttpEvent, HttpRequest, HttpHeaders, HttpHandlerFn, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterceptorSkipHeader } from '../services/http.service';
import { TOKEN } from '../helpers/constants';

export function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    if (request.headers.has(InterceptorSkipHeader)) {
        const headers = request.headers.delete(InterceptorSkipHeader);
        let clonedRequest = request.clone({ headers });
        
        return next(clonedRequest);
    }
    else {
        const token = localStorage.getItem(TOKEN)!;
        
        let clonedRequest = request.clone({
            headers: new HttpHeaders({ "Authorization": token })
        });
    
        return next(clonedRequest);
    }
}