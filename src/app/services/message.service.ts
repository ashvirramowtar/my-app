import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "./http.service";

const ENDPOINT = {
    SEND: 'send',
};

@Injectable({
    providedIn: 'root'
})
export class MessageService extends HttpService {
    private applicationName = "/message/";

    constructor(http: HttpClient) {
        super(http);
        this.initialisePath();
    }

    private initialisePath(): void {
        let domain = this.getDomain();
        this.path = domain + this.applicationName;
        console.log("current path: " + this.path);
    }

    public send(message: string): Observable<any> {
        return super.post(ENDPOINT.SEND, message);
    }
}