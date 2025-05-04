import { AbstractControl } from "@angular/forms";
import { Validator } from './validator';
import { Error } from '../models/error';

export function ValidateCharacter(control: AbstractControl): { [key: string]: any } | null {

    if (control.touched || control.dirty) {
        let value = control.value;
        if (!Validator.hasValue(value))
            return new Error("Please select your character.");
    }
    
    return null;
}