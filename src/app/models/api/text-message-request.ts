export class TextMessageRequest {
    public Model: string;
    public Prompt: string;

    public constructor(characterName: string, textMessage: string) {
        this.Model = characterName;
        this.Prompt = textMessage;    
    }
}