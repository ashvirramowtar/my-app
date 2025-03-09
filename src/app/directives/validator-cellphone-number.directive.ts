import { AbstractControl } from "@angular/forms";
import { Validator } from './validator';
import { Error } from '../models/error';

export function ValidateCellphoneNumber(control: AbstractControl): { [key: string]: any } | null {

    if (control.touched || control.dirty) {
        let value = control.value;
        if (!Validator.hasValue(value))
            return new Error("Please enter your cellphone number.");
        else if (!Validator.isCellphoneNumberValid(value))
            return new Error("Please enter a valid cellphone number.");
    }
    
    return null;
}