import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "./http.service";
import { TextMessageResponse } from "../models/api/text-message-response";
import { TypeMapper } from "../mappers/type-mapper";

const ENDPOINT = {
    SEND: "text"
};

@Injectable({
    providedIn: 'root'
})
export class MessageService extends HttpService {

    constructor(http: HttpClient) {
        super(http);
    }

    public override getApplicationName(): string {
        return "api";
    }

    public sendText(characterName: string, textMessage: string): Observable<TextMessageResponse> {
        let request = TypeMapper.buildTextMessageRequest(characterName, textMessage);
        return super.post(ENDPOINT.SEND, request);
    }
}