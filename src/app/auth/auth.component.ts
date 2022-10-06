import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({ selector: 'app-auth', templateUrl: './auth.component.html' })
export class AuthComponent {
  isLoginMode: boolean = true;

  constructor() {}

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm): void {
    
  }
}
