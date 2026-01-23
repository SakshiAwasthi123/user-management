import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { AppButton } from '../../shared/app-button/app-button';
import { AppInput } from '../../shared/app-input/app-input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, AppButton, AppInput],
  templateUrl: './login.html'
})
export class Login implements OnInit {

  email = '';
  password = '';
  rememberMe = false;
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('remember_email');
    if (saved) {
      this.email = saved;
      this.rememberMe = true;
    }
  }
login(form: any) {

  if (form.invalid) {
    return;
  }

  const success = this.auth.login(this.email, this.password);

  if (!success) {
    this.errorMsg = 'Invalid email or password';
    return;
  }

  this.errorMsg = '';

  if (this.rememberMe) {
    localStorage.setItem('remember_email', this.email);
  } else {
    localStorage.removeItem('remember_email');
  }

  const redirect = localStorage.getItem('redirectAfterLogin');

  if (redirect) {
    localStorage.removeItem('redirectAfterLogin');
    this.router.navigateByUrl(redirect);
  } else {
    this.router.navigate(['/dashboard']);
  }
}

}
