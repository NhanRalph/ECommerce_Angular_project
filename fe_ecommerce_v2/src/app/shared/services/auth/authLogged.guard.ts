// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthLoggedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // Redirect to login page
      this.router.navigate(['/']);
      return false;
    }

    return true;
    // else {
    //   // Check if user ID matches expected user ID here
    //   // For example:
    //   //   const expectedUserId = '123'; // Set your expected user ID here
    //   //   const userId = this.authService.getUserId();
    //   //   if (userId === expectedUserId) {
    //   //     return true; // User is authenticated and user ID matches
    //   //   } else {
    //   //     // Redirect to unauthorized page or show error message
    //   // }
    //   //   this.router.navigate(['/unauthorized']);
    //   //   return false;
    // }
  }
}
