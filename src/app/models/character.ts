import { Entity } from "./entity";

export class Character extends Entity {
    
    public get type(): string {
        return "Character";
    }

    public constructor(name: string) {
        super(name);
    }
    
}