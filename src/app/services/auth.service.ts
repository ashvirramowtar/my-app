import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Validator } from "../directives/validator";
import { TOKEN } from "../helpers/constants";
import { HttpService } from "./http.service";

const ENDPOINT = {
    LOGIN: 'login',
};

@Injectable({
    providedIn: 'root'
})
export class AuthService extends HttpService {
    private applicationName = "/auth/";

    constructor(http: HttpClient) {
        super(http);
        this.initialisePath();
    }

    private initialisePath(): void {
        let domain = this.getDomain();
        this.path = domain + this.applicationName;
        console.log("current path: " + this.path);
    }

    public login(username: string, password: string): Observable<any> {
        let request = { username: username, password: password };
        return super.postWithoutIntercept(ENDPOINT.LOGIN, request).pipe(map((response: any) => {
            localStorage.setItem(TOKEN, response.token)
            return true;
        }));
    }

    public getToken(): string {
        let token = localStorage.getItem(TOKEN)!;
        return token;
    }

    public hasToken(): boolean {
        let token = this.getToken();
        return Validator.hasValue(token);
    }

    public logOut(): void {
        localStorage.removeItem(TOKEN);
    }
}