import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html'
})
export class Register {

  email = '';
  password = '';
  confirmPassword = '';
  errorMsg = '';
  successMsg = '';
  role = 'User';

  constructor(private router: Router) {}

  register() {

    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMsg = 'All fields are required';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Passwords do not match';
      return;
    }

    let users = JSON.parse(localStorage.getItem('APP_USERS') || '[]');

    const exists = users.find((u: any) => u.email === this.email);

    if (exists) {
      this.errorMsg = 'User already exists';
      return;
    }

    users.push({
      email: this.email,
      password: this.password,
      role: this.role
    });

    localStorage.setItem('APP_USERS', JSON.stringify(users));

    this.successMsg = 'Account created successfully';

    setTimeout(() => this.router.navigate(['/login']), 1000);
  }
}
