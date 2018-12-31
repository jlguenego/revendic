import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceGuard implements CanActivate {

  constructor(private user: UserService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.user.isConnected()
      .then(() => true)
      .catch(() => {
        this.user.url = state.url;
        this.router.navigate([this.user.path.login]);
        return false;
      });
  }
}
