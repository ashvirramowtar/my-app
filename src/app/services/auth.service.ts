import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Validator } from "../directives/validator";
import { TOKEN } from "../helpers/constants";
import { HttpService } from "./http.service";
import { User } from "../models/user";
import { RegisterUserResponse } from "../models/api/register-user-response";
import { TypeMapper } from "../mappers/type-mapper";
import { LoginUserResponse } from "../models/api/login-user-response";

const ENDPOINT = {
    LOGIN: 'login',
    REGISTER: 'register',
};

@Injectable({
    providedIn: 'root'
})
export class AuthService extends HttpService {
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

    public login(emailAddress: string, password: string): Observable<LoginUserResponse> {
        let request = TypeMapper.buildLoginUserRequest(emailAddress, password);
        return super.postWithoutIntercept(ENDPOINT.LOGIN, request);
    }

    public register(user: User): Observable<RegisterUserResponse> {
        let request = TypeMapper.buildRegisterUserRequest(user);
        return super.postWithoutIntercept(ENDPOINT.REGISTER, request);
    }

    public logOut(): void {
        localStorage.removeItem(TOKEN);
    }
}