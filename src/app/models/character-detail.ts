export class CharacterDetail {
    
    private _name : string;
    public get name() : string {
        return this._name;
    }
    
    private _code : string;
    public get code() : string {
        return this._code;
    }
    
    public constructor(name: string, code: string) {
        this._name = name;
        this._code = code;
    }

    public static get EMPTY(): CharacterDetail {
        return new CharacterDetail("", ""); 
    } 
}