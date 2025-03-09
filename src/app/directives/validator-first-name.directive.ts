import { AbstractControl } from "@angular/forms";
import { Validator } from './validator';
import { Error } from '../models/error';

export function ValidateFirstName(control: AbstractControl): { [key: string]: any } | null {

    if (control.touched || control.dirty) {
        let value = control.value;
        if (!Validator.hasValue(value))
            return new Error("Please enter your first name.");
        else if (!Validator.hasAnAlphabet(value))
            return new Error("Please a valid first name.");
    }
    
    return null;
}