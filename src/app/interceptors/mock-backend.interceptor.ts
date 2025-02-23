import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Validator } from '../directives/validator';

const METHOD = {
    GET: "GET",
    POST: "POST"
};

const CREDENTIAL = {
    USERNAME: "testuser",
    PASSWORD: "Momentum@1"
};

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case ((url.endsWith('login')) && (method == METHOD.POST)):
                    return login();
                case ((url.endsWith('getall')) && (method == METHOD.GET)):
                    return getAll();
                default:
                    return next.handle(request);
            }    
        }

        function login() {
            const { username, password } = body;
            if (Validator.isEqualIgnoreCase(CREDENTIAL.USERNAME, username) && Validator.isEqual(CREDENTIAL.PASSWORD, password))
                return ok({ token: 'valid-token'});
            else 
                return unauthorized();
        }

        function getAll() {
            if (isLoggedIn())
                return ok({ agreements: AGREEMENTS });
            else
                return unauthorized();
        }

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Username or password is incorrect.' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') == 'valid-token';
        }
    }
}

export const mockBackendProvider = { provide: HTTP_INTERCEPTORS, useClass: MockBackendInterceptor, multi: true };