import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppInput } from '../../shared/app-input/app-input';
import { AppButton } from '../../shared/app-button/app-button';
import { FormWrapper } from '../../shared/form-wrapper/form-wrapper';
import { AppAlert } from '../../shared/app-alert/app-alert';
import { AppSelect } from '../../shared/app-select/app-select';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AppInput,
    AppButton,
    FormWrapper,
    AppAlert,
    AppSelect
  ],
  templateUrl: './register.html'
})
export class Register implements OnInit {

  form!: FormGroup;

  errorMsg = '';
  successMsg = '';

  roles = [
    { label: 'User', value: 'User' },
    { label: 'Admin', value: 'Admin' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required),
      confirmPassword: this.fb.control('', Validators.required),
      role: this.fb.control('', Validators.required)
    });
  }

  // ✅ TYPED GETTERS (THIS IS THE FIX)
  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.form.get('confirmPassword') as FormControl;
  }

  get role(): FormControl {
    return this.form.get('role') as FormControl;
  }

  register(): void {

    this.errorMsg = '';
    this.successMsg = '';

    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.errorMsg = 'Please fix form errors';
      return;
    }

    const { email, password, confirmPassword, role } = this.form.value;

    if (password !== confirmPassword) {
      this.errorMsg = 'Passwords do not match';
      return;
    }

    const users = JSON.parse(
      localStorage.getItem('APP_USERS') || '[]'
    );

    if (users.find((u: any) => u.email === email)) {
      this.errorMsg = 'User already exists';
      return;
    }

    users.push({ email, password, role });
    localStorage.setItem('APP_USERS', JSON.stringify(users));

    this.successMsg = 'Account created successfully! Redirecting…';

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }
}
