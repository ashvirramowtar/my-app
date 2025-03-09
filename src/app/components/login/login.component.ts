import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateEmailAddress } from '../../directives/validator-email-address.directive'
import { ValidatePassword } from '../../directives/validator-password.directive'

@Component({
	selector: 'app-login',
    standalone: false,
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    isLoggingIn: boolean;
	emailAddress: FormControl;
    password: FormControl;
    message: string;

    constructor(private router: Router) {

    }

    public ngOnInit(): void {
        this.isLoggingIn = false;
        this.message = "";
        this.emailAddress = new FormControl("asd@asd.com", { validators: ValidateEmailAddress, updateOn: 'blur' });
        this.password = new FormControl("asd", { validators: ValidatePassword, updateOn: 'blur' });
    }

    public login(): void {
        this.emailAddress.markAsTouched();
        this.password.markAsTouched();
        
        this.emailAddress.updateValueAndValidity();
        this.password.updateValueAndValidity();

        if (this.emailAddress.valid && this.password.valid) {
            this.isLoggingIn = true;
            setTimeout(() => { 
                this.isLoggingIn = false;
                this.router.navigate(["chat"])
            }, 1000);
        }
    }
}
