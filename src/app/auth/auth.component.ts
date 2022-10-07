import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './service/auth.service';

@Component({ selector: 'app-auth', templateUrl: './auth.component.html' })
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

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
        next: (resData) => {
          this.isLoading = false;
        },
        error: (errorMessage) => {
          this.error = errorMessage;
          this.isLoading = false;
        },
        complete: () => {
          this.router.navigate(['/recipes']);
        },
      });
    } else {
      this.authService.login(email, password).subscribe({
        next: (resData) => {
          this.isLoading = false;
        },
        error: (errorMessage) => {
          this.error = errorMessage;
          this.isLoading = false;
        },
        complete: () => {
          this.router.navigate(['/recipes']);
        },
      });
    }

    authForm.reset();
  }

  onCloseAlert(): void {
    this.error = null;
  }
}
