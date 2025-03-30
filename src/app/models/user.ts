export class User {
    
    private _firstName : string;
    public get firstName() : string {
        return this._firstName;
    }
    
    private _lastName : string;
    public get lastName() : string {
        return this._lastName;
    }
    
    private _emailAddress : string;
    public get emailAddress() : string {
        return this._emailAddress;
    }
    
    private _cellphoneNumber : string;
    public get cellphoneNumber() : string {
        return this._cellphoneNumber;
    }
    
    private _password : string;
    public get password() : string {
        return this._password;
    }
    
    public constructor(firstName: string, lastName: string, emailAddress: string, cellphoneNumber: string, password: string) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._emailAddress = emailAddress;
        this._cellphoneNumber = cellphoneNumber;
        this._password = password;
    }
    
}