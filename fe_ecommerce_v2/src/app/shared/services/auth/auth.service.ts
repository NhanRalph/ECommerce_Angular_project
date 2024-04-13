import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isLoggedIn(): boolean {
    // Check if user is logged in by verifying the presence of user data in localStorage
    return !!localStorage.getItem('user');
  }

  getUserId(): number | null {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.user_id;
    }
    return null;
  }

  getUserData(): any {
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  }
}
