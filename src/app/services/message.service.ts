import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "./http.service";
import { TextMessageRequest } from "../models/api/text-message-request";
import { TextMessageResponse } from "../models/api/text-message-response";

const ENDPOINT = {
    SEND: "text"
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

    public sendText(characterName: string, textMessage: string): Observable<TextMessageResponse> {
        let request = new TextMessageRequest(characterName, textMessage);
        return super.post(ENDPOINT.SEND, request);
    }
}