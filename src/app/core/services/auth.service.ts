import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private TOKEN_KEY = 'APP_TOKEN';
  private ROLE_KEY = 'APP_ROLE';
  private USER_KEY = 'APP_USER';

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {

    let users = JSON.parse(localStorage.getItem('APP_USERS') || '[]');

    if (!users || users.length === 0) {
      users = [
        {
          email: 'admin@gmail.com',
          password: '1234',
          role: 'Admin'
        }
      ];
      localStorage.setItem('APP_USERS', JSON.stringify(users));
    }

    const user = users.find((u: any) =>
      u.email === email && u.password === password
    );

    if (!user) {
      return false;
    }

    localStorage.setItem(this.TOKEN_KEY, 'jwt_' + Date.now());
    localStorage.setItem(this.ROLE_KEY, user.role);
    localStorage.setItem(this.USER_KEY, user.email);

    return true;
  }


  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem(this.USER_KEY);

    this.router.navigate(['/login']);
  }

  get token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }

  getCurrentUser(): string | null {
    return localStorage.getItem(this.USER_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }
}
