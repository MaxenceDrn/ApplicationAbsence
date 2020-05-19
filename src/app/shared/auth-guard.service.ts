import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(
      private router: Router,
      private authenticationService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      if(currentUser.role === 'Etudiant'){
        this.router.navigate(['/homeEtu']).then(r => {return true});
       }else if(currentUser.role === 'Secretaire'){
        this.router.navigate(['/homeDir']).then(r => {return true});
      }
      else if(currentUser.role === 'Directeur'){
        this.router.navigate(['/homeDir']).then(r => {return true});
      }
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}}).then(r => {return false;});

  }

}
