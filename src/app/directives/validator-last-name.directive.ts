import { AbstractControl } from "@angular/forms";
import { Validator } from './validator';
import { Error } from '../models/error';

export function ValidateLastName(control: AbstractControl): { [key: string]: any } | null {

    if (control.touched) {
        let value = control.value;
        if (!Validator.hasValue(value))
            return new Error("Please enter your last name.");
        else if (!Validator.hasAnAlphabet(value))
            return new Error("Please a valid last name.");
    }
    
    return null;
}