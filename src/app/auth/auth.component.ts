import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './service/auth.service';

@Component({ selector: 'app-auth', templateUrl: './auth.component.html' })
export class AuthComponent {
  isLoginMode: boolean = true;

  constructor(private authService: AuthService) {}

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm): void {
    if (!authForm.valid) {
      return;
    }

    const { email, password } = authForm.value;

    if (!this.isLoginMode) {
      this.authService.singUp(email, password).subscribe({
        next: (resData) => console.log(resData),
        error: (error) => console.error(error),
      });
    }

    authForm.reset();
  }
}
