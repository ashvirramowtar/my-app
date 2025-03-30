import { LoginUserRequest } from "../models/api/login-user-request";
import { RegisterUserRequest } from "../models/api/register-user-request";
import { User } from "../models/user";

export class TypeMapper {

    private constructor() { }

    public static buildLoginUserRequest(username: string, password: string): LoginUserRequest {
        let request = new LoginUserRequest(username, password);

        return request;
    }

    public static buildRegisterUserRequest(user: User): RegisterUserRequest {
        let request = new RegisterUserRequest(user.firstName, user.lastName, user.cellphoneNumber,
            user.emailAddress, user.password, "");

        return request;
    }
}