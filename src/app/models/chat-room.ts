import { Validator } from "../directives/validator";

export class ChatRoom {
    
    private _code : string;
    public get code() : string {
        return this._code;
    }

    private _characterNames : string[];
    public get characterNames() : string[] {
        return this._characterNames;
    }
        
    public constructor(code: string, characterNames: string[]) {
        this._code = code;
        this._characterNames = characterNames;
    }

    public get friendlyName() {
        let friendlyName = "";

        if (this.characterNames.length == 1) {
            friendlyName = this.characterNames[0];
        }
        else if (this.characterNames.length == 2) {
            friendlyName = this._characterNames[0] + " and " + this._characterNames[1];
        }
        else {
            for (let i = 0; i < (this.characterNames.length - 2); i++)
                friendlyName += this.characterNames[i] + ", ";
            
            friendlyName += this._characterNames[this.characterNames.length - 2] + " and " + this._characterNames[this.characterNames.length - 1];
        }

        return friendlyName;
    }

    public isValid(): boolean {
        return (Validator.hasValue(this.code) && (this.characterNames.length > 0))
    }
}
