import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';
const headers = new HttpHeaders().set(InterceptorSkipHeader, '');

export abstract class HttpService {
    protected path: string;

    constructor(private httpClient: HttpClient) {
        this.path = this.getDomain() + "/" + this.getApplicationName() + "/";
        console.log("current path: " + this.path);
    }

    protected getDomain(): string {
        return 'http://localhost:5250';
    }

    protected abstract getApplicationName(): string;

    protected get<TResponse>(endpoint: string): Observable<TResponse> {
        return this.httpClient.get<TResponse>(this.path + endpoint);
    }

    protected getWithoutIntercept<TResponse>(endpoint: string): Observable<TResponse> {
        return this.httpClient.get<TResponse>(this.path + endpoint, { headers: headers });
    }

    protected post<TRequest, TResponse>(endpoint: string, request: TRequest): Observable<TResponse> {
        return this.httpClient.post<TResponse>(this.path + endpoint, request);
    }

    protected postWithoutIntercept<TRequest, TResponse>(endpoint: string, request: TRequest): Observable<TResponse> {
        return this.httpClient.post<TResponse>(this.path + endpoint, request, { headers: headers });
    }

    protected put<TRequest, TResponse>(endpoint: string, request: TRequest): Observable<TResponse> {
        return this.httpClient.put<TResponse>(this.path + endpoint, request);
    }

    protected delete<TResponse>(endpoint: string, id: string): Observable<TResponse> {
        return this.httpClient.delete<TResponse>(this.path + endpoint + id);
    }
}