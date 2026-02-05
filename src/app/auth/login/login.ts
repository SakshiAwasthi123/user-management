import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl
} from '@angular/forms';

import { AppInput } from '../../shared/app-input/app-input';
import { AppButton } from '../../shared/app-button/app-button';
import { FormWrapper } from '../../shared/form-wrapper/form-wrapper';
import { AppAlert } from '../../shared/app-alert/app-alert';
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
    FormWrapper,
    AppAlert
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
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required)
    });
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  login(): void {

    this.errorMsg = '';
    this.successMsg = '';

    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      this.errorMsg = 'Please fill all required fields correctly';
      return;
    }

    const { email, password } = this.loginForm.value;

    const isLoggedIn = this.auth.login(email, password);

    if (!isLoggedIn) {
      this.errorMsg = 'Invalid email or password';
      return;
    }

    this.successMsg = 'Login successful! Redirecting...';

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);
  }
}
