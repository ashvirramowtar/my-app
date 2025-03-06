import { Entity } from "./entity";

export class Person extends Entity {
    
    public get type(): string {
        return "Person";
    }

    public constructor(name: string) {
        super(name);
    }
    
}