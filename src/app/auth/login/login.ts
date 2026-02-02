import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { AppInput } from '../../shared/app-input/app-input';
import { AppButton } from '../../shared/app-button/app-button';
import { FormWrapper } from '../../shared/form-wrapper/form-wrapper';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AppInput,
    AppButton,
    FormWrapper
  ],
  templateUrl: './login.html'
})
export class Login implements OnInit {

  loginForm!: FormGroup;
  errorMsg = '';
  successMsg = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    const success = this.auth.login(email, password);

    if (!success) {
      this.errorMsg = 'Invalid email or password';
      this.successMsg = '';
      return;
    }

    this.errorMsg = '';
    this.successMsg = 'Login successful! Redirecting...';

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);
  }
}
