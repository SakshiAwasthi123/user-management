import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppInput } from '../../shared/app-input/app-input';
import { AppButton } from '../../shared/app-button/app-button';
import { FormWrapper } from '../../shared/form-wrapper/form-wrapper';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AppInput,
    AppButton,
    FormWrapper
  ],
  templateUrl: './register.html'
})
export class Register implements OnInit {

  form!: FormGroup;
  errorMsg = '';
  successMsg = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['User', Validators.required]
    });
  }

  register() {
    console.log('Register clicked'); 

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

    let users = JSON.parse(localStorage.getItem('APP_USERS') || '[]');

    if (users.find((u: any) => u.email === email)) {
      this.errorMsg = 'User already exists';
      return;
    }

    users.push({ email, password, role });
    localStorage.setItem('APP_USERS', JSON.stringify(users));

    this.successMsg = 'Account created successfully';
    this.errorMsg = '';

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }
}
