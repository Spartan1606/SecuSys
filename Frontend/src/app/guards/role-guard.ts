import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../services/auth';
@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    if (!token || this.authService.isTokenExpired(token)) {
      console.warn('[RoleGuard] No valid token — redirecting to login');
      this.router.navigate(['/tabs/tab2']); // your login tab
      return false;
    }

    const userRole = this.authService.getUserRole();
    const allowedRoles = route.data['roles'] as string[];

    console.log(`[RoleGuard] User role: ${userRole} | Allowed roles:`, allowedRoles);

    if (userRole && allowedRoles.includes(userRole)) {
      console.log('[RoleGuard] Access granted');
      return true;
    }

    console.warn('[RoleGuard] Access denied — redirecting to tab2');
    this.router.navigate(['/tabs/tab2']);
    return false;
  }
}

