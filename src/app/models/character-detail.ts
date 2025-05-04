export class CharacterDetail {
    
    private _name : string | null;
    public get name() : string | null {
        return this._name;
    }
    
    private _code : string | null;
    public get code() : string | null {
        return this._code;
    }
    
    private _image : string | null;
    public get image() : string | null {
        return this._image;
    }
    
    public constructor(name: string | null, code: string | null, image: string | null) {
        this._name = name;
        this._code = code;
        this._image = image;
    }

    public static get EMPTY(): CharacterDetail {
        return new CharacterDetail(null, null, null); 
    } 
}