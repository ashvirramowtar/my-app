import { ValidatorFn, AbstractControl } from '@angular/forms';
import { PhoneNumberUtil, PhoneNumber } from 'google-libphonenumber';
import { Validator } from './validator';

const phoneNumberUtil = PhoneNumberUtil.getInstance();

function isaSouthAfricanCellPhoneNumber(code: string): boolean {
    return (code == "ZA");
}

function isaValidSouthAfricanCellPhoneNumber(phoneNumber: PhoneNumber): boolean {
    let nationalNumber = phoneNumber.getNationalNumber().toString();
    let firstDigit = nationalNumber.charAt(0);
    return ((firstDigit == "6") || (firstDigit == "7") || (firstDigit == "8"));
}

export function ValidateCellPhoneNumber(code: string = undefined): ValidatorFn {
    return (control: AbstractControl): { [ key: string ]: any } => {
        let isValid = false;
        
        try {
            const cellPhoneNumber = phoneNumberUtil.parseAndKeepRawInput(control.value, code);
            isValid = phoneNumberUtil.isValidNumber(cellPhoneNumber);

            if (isValid && isaSouthAfricanCellPhoneNumber(code)) {
                isValid = isaValidSouthAfricanCellPhoneNumber(cellPhoneNumber);
            }
        }
        catch (e) {
            console.log("Error validating cell phone number: ", e);
        }

        if (!isValid)
            return new Error("Please enter a valid cell phone number.");
        else
            return null;
    }
}