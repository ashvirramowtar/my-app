import { AbstractControl, ValidatorFn } from "@angular/forms";
import { Validator } from './validator';
import { Error } from '../models/error';

export function ValidateConfirmPassword(originalPassword: string): ValidatorFn {
    return (control: AbstractControl): { [ key: string ]: any } => {

        if (control.touched || control.dirty) {
            let value = control.value;
            if (!Validator.hasValue(value))
                return new Error("Please confirm your password.")
            else if (!Validator.areEqual(originalPassword, value))
                return new Error("Passwords do not match.");
        }

        return null as any;
    }
}