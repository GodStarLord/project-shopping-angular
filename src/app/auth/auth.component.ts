import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './service/auth.service';

@Component({ selector: 'app-auth', templateUrl: './auth.component.html' })
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm): void {
    if (!authForm.valid) {
      return;
    }

    this.isLoading = true;
    const { email, password } = authForm.value;

    if (!this.isLoginMode) {
      this.authService.singUp(email, password).subscribe({
        next: (resData) => console.log(resData),
        error: (errorMessage) => {
          this.error = errorMessage;
        },
        complete: () => (this.isLoading = false),
      });
    } else {
      this.authService.login(email, password).subscribe({
        next: (resData) => console.log(resData),
        error: (errorMessage) => {
          this.error = errorMessage;
        },
        complete: () => (this.isLoading = false),
      });
    }

    authForm.reset();
  }
}
