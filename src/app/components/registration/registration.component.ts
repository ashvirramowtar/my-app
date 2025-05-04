import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidateFirstName } from '../../directives/validator-first-name.directive';
import { ValidateLastName } from '../../directives/validator-last-name.directive';
import { ValidateCellphoneNumber } from '../../directives/validator-cellphone-number.directive';
import { ValidateEmailAddress } from '../../directives/validator-email-address.directive';
import { ValidatePassword } from '../../directives/validator-password.directive';
import { ValidateConfirmPassword } from '../../directives/validator-confirm-password.directive';
import { ValidateCharacter } from '../../directives/validator-character.directive';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { CharacterDetail } from '../../models/character-detail';
import { CHARACTERS } from '../../helpers/constants';

@Component({
	selector: 'app-registration',
	standalone: false,
	templateUrl: './registration.component.html',
	styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
	isRegistering: boolean;
	message: string;
	characters: CharacterDetail[];

	firstName: FormControl;
	lastName: FormControl;
	cellphoneNumber: FormControl;
	emailAddress: FormControl;
	password: FormControl;
	confirmPassword: FormControl;
	character: FormControl;
		
	public ngOnInit(): void {
		this.isRegistering = false;
		this.message = "";
		this.characters = CHARACTERS;

		this.firstName = new FormControl("", { validators: ValidateFirstName, updateOn: 'blur' });
		this.lastName = new FormControl("", { validators: ValidateLastName, updateOn: 'blur' });
		this.cellphoneNumber = new FormControl("" , { validators: ValidateCellphoneNumber, updateOn: 'blur' });
		this.emailAddress = new FormControl("", { validators: ValidateEmailAddress, updateOn: 'blur' });
		this.password = new FormControl("", { validators: ValidatePassword, updateOn: 'blur' });
		this.confirmPassword = new FormControl("", { validators: ValidateConfirmPassword(this.password.value), updateOn: 'blur'});
		this.character = new FormControl(null, { validators: ValidateCharacter, updateOn: 'change' });
	}

	constructor(private router: Router, private authService: AuthService) {
		
	}

	public reinitialisePasswordValidators(): void {
		this.confirmPassword.setValidators(ValidatePassword);
		this.confirmPassword.setValidators(ValidateConfirmPassword(this.password.value));

		this.password.updateValueAndValidity();
		this.confirmPassword.updateValueAndValidity();
	}

	public register(): void {
		this.firstName.markAsTouched();
		this.lastName.markAsTouched();
		this.cellphoneNumber.markAsTouched();
		this.emailAddress.markAsTouched();
		this.password.markAsTouched();
		this.confirmPassword.markAsTouched();
		this.character.markAsTouched();
		
		this.firstName.updateValueAndValidity();
		this.lastName.updateValueAndValidity();
		this.cellphoneNumber.updateValueAndValidity();
		this.emailAddress.updateValueAndValidity();
		this.password.updateValueAndValidity();
		this.confirmPassword.updateValueAndValidity();
		this.character.updateValueAndValidity();

		this.reinitialisePasswordValidators();

		if (this.firstName.valid && this.lastName.valid && this.cellphoneNumber.valid && this.emailAddress.valid 
				&& this.password.valid && this.confirmPassword.valid && this.character.valid) {
            this.isRegistering = true;

			let user = new User(this.firstName.value, this.lastName.value, this.emailAddress.value, 
				this.cellphoneNumber.value, this.password.value, this.character.value);

			this.authService.register(user).subscribe({
				next: (response => {
					this.isRegistering = false;

					if (response.Code == 201)
						this.router.navigate(["login"])
					else if (response.Code == 409)
						this.message = response.Message;

				}),
				error: (error => {
					console.log("Error :", error);
					this.isRegistering = false;
				})
			 });
        }
	}	
}