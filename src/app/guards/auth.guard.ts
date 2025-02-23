import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) {

    }
    
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
        if (this.authService.hasToken())
            return true;
        else {
            console.log("User is not authorised.");
            window.location.href = "/login";
            return false;
        }
    }
}