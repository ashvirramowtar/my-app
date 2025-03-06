export abstract class Entity {
    
    private _name : string;
    public get name() : string {
        return this._name;
    }

    public constructor(name: string) {
        this._name = name;
    }

    abstract get type(): string;
}