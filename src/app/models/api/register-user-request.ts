export class RegisterUserRequest {
    public FirstName: string;
    public LastName: string;
    public CellphoneNumber: string;
    public EmailAddress: string;
    public Password: string;
    public Character: string;

    public constructor(firstName: string, lastName: string, cellphoneNumber: string, 
            emailAddress: string, password: string, character: string) {
        this.FirstName = firstName;
        this.LastName = lastName;
        this.CellphoneNumber = cellphoneNumber;
        this.EmailAddress = emailAddress;
        this.Password = password;
        this.Character = character;
    }
}