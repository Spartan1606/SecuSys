import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = this.authService.getToken();

    console.log('[AuthGuard] Checking token:', token);

    if (!token || this.authService.isTokenExpired(token)) {
      console.warn('[AuthGuard] Token missing or expired — redirecting to login.');
      this.authService.logout();
      return this.router.createUrlTree(['/tabs/tab2']);
    }

    console.log('[AuthGuard] Token valid — access granted.');
    return true;
  }
}
