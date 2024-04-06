import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { from, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  signIn(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`http://localhost:8080/signin`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          // Store authentication data in local storage
          // this.localStorage.setItem('token', response.token);
          // Optionally, store user data if available
          window.localStorage.setItem('user', JSON.stringify(response.user));
          window.localStorage.setItem(
            'user_id',
            JSON.stringify(response.user.user_id)
          );
        })
      );
  }

  logout(): void {
    // Clear stored authentication data
    window.localStorage.removeItem('user');
    // Redirect to sign-in page
    this.router.navigate(['/signin']);
  }

  getUserId(): number | null {
    const userIdString = window.localStorage.getItem('user_id');
    if (userIdString) {
      return parseInt(userIdString);
    } else {
      return null;
    }
  }
}
