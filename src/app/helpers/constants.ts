import { CharacterDetail } from "../models/character-detail";

export const TOKEN = "TOKEN";

export const CHARACTERS: CharacterDetail[] = [
    new CharacterDetail("Rick Sanchez", "rick", "rick-sanchez.png"),
    new CharacterDetail("Panic and Pain", "pap", "panic-and-pain.png"),
    new CharacterDetail("Yoda", "yoda", "yoda.png"),
];

export function CHARACTER(code: string): CharacterDetail {
    return (CHARACTERS.find(x => x.code == code))!;
}