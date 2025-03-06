import { Entity } from "./entity";

export class Message {
    
    private _entity : Entity;
    public get entity() : Entity {
        return this._entity;
    }
    
    private _text : string;
    public get text() : string {
        return this._text;
    }
    
    public constructor(entity: Entity, text: string) {
        this._entity = entity;
        this._text = text;
    }
}