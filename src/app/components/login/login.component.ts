import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateEmailAddress } from '../../directives/validator-email-address.directive'
import { ValidatePassword } from '../../directives/validator-password.directive'
import { AuthService } from '../../services/auth.service';
import { TOKEN } from '../../helpers/constants';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginUserResponse } from '../../models/api/login-user-response';

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

    constructor(private router: Router, private authService: AuthService) {

    }

    public ngOnInit(): void {
        this.isLoggingIn = false;
        this.message = "";
        this.emailAddress = new FormControl("", { validators: ValidateEmailAddress, updateOn: 'blur' });
        this.password = new FormControl("", { validators: ValidatePassword, updateOn: 'blur' });
    }

    public login(): void {
        this.emailAddress.markAsTouched();
        this.password.markAsTouched();
        
        this.emailAddress.updateValueAndValidity();
        this.password.updateValueAndValidity();

        if (this.emailAddress.valid && this.password.valid) {
            this.isLoggingIn = true;

            this.authService.login(this.emailAddress.value, this.password.value).subscribe({
				next: ((response: LoginUserResponse) => {
					localStorage.setItem(TOKEN, response.Token);
                    this.isLoggingIn = false;
                    this.router.navigate(["chat"]);
                }),
				error: ((error: HttpErrorResponse) => {
                    if (error.status == 401) {
                        this.message = "Username or password is incorrect."; 
					}
                    else {
                        console.log(error);
                    }
                    
					this.isLoggingIn = false;
				})
			 });
        }
    }
}
