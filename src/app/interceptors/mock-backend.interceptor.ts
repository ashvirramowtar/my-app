import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Validator } from '../directives/validator';

const METHOD = {
    GET: "GET",
    POST: "POST"
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
            return send();  
        }

        function send() {
            return ok({ response: 'hi there' });
        }

        function ok(body: any) {
            return of(new HttpResponse({ status: 200, body }))
        }
    }
}

export const mockBackendProvider = { provide: HTTP_INTERCEPTORS, useClass: MockBackendInterceptor, multi: true };