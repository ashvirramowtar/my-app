import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "./http.service";

const ENDPOINT = {
    SEND: 'text?model=',
};

@Injectable({
    providedIn: 'root'
})
export class MessageService extends HttpService {
    private applicationName = "/api/";

    constructor(http: HttpClient) {
        super(http);
        this.initialisePath();
    }

    private initialisePath(): void {
        let domain = this.getDomain();
        this.path = domain + this.applicationName;
        console.log("current path: " + this.path);
    }

    public sendText(characterName: string, textMessage: string): Observable<any> {
        return super.post(ENDPOINT.SEND + characterName, { Prompt: textMessage, Model: characterName });
    }
}