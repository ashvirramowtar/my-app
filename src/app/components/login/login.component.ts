import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateUsername } from '../../directives/validator-username.directive'
import { ValidatePassword } from '../../directives/validator-password.directive'

@Component({
	selector: 'app-login',
    standalone: false,
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
	username: FormControl;
    password: FormControl;
    message: string;

    constructor(private router: Router) {

    }

    public ngOnInit(): void {
        this.message = "";
        this.username = new FormControl("", { validators: ValidateUsername, updateOn: 'blur' });
        this.password = new FormControl("", { validators: ValidatePassword, updateOn: 'blur' });
    }

    public login(): void {
        this.username.markAsTouched();
        this.password.markAsTouched();
        
        this.username.updateValueAndValidity();
        this.password.updateValueAndValidity();
    }
}
