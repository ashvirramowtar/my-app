import { Character } from "./character";
import { Entity } from "./entity";
import { Message } from "./message";
import { Person } from "./person";

export class Conversation {
        
    private _messages : Message[];
    public get messages() : Message[] {
        return this._messages;
    }
    
    public constructor() {
        this._messages = [];
    }

    public addPersonMessage(name: string, text: string): void {
        let person = new Person(name);
        this.addMessage(person, text);
    }

    public addCharacterMessage(name: string, text: string): void {
        let character = new Character(name);
        this.addMessage(character, text);
    }

    private addMessage(entity: Entity, text: string) {
        let message = new Message(entity, text);
        this._messages.push(message);
    }
}