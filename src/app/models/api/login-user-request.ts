export class LoginUserRequest {
    public Username: string;
    public Password: string;

    public constructor(username: string, password: string) {
        this.Username = username;
        this.Password = password;
    }
}