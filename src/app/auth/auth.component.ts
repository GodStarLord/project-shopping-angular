import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AlertComponent } from '../shared/component/alert/alert.component';
import { PlaceHolderDirective } from '../shared/directive/placeholder.directive';
import { AppState } from '../store/app.reducer';

import { AuthService } from './service/auth.service';

import * as AuthActions from './store/auth.actions';

@Component({ selector: 'app-auth', templateUrl: './auth.component.html' })
export class AuthComponent implements OnDestroy, OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  @ViewChild(PlaceHolderDirective, { static: false })
  alertHost: PlaceHolderDirective;
  private closeSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.isLoading;
      this.error = authState.authErrorMsg;

      if (this.error) this.showErrorAlert(this.error);
    });
  }

  ngOnDestroy(): void {
    if (this.closeSubscription) this.closeSubscription.unsubscribe();
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm): void {
    if (!authForm.valid) {
      return;
    }

    const { email, password } = authForm.value;

    if (!this.isLoginMode) {
      this.store.dispatch(new AuthActions.SignupStart({ email, password }));
      // this.authService.singUp(email, password).subscribe({
      //   next: (resData) => {
      //     this.isLoading = false;
      //   },
      //   error: (errorMessage) => {
      //     this.error = errorMessage;
      //     this.isLoading = false;
      //     this.showErrorAlert(errorMessage);
      //   },
      //   complete: () => {
      //     this.router.navigate(['/recipes']);
      //   },
      // });
    } else {
      this.store.dispatch(new AuthActions.LoginStart({ email, password }));
      // this.authService.login(email, password).subscribe({
      //   next: (resData) => {
      //     this.isLoading = false;
      //   },
      //   error: (errorMessage) => {
      //     this.error = errorMessage;
      //     this.isLoading = false;
      //     this.showErrorAlert(errorMessage);
      //   },
      //   complete: () => {
      //     this.router.navigate(['/recipes']);
      //   },
      // });
    }

    authForm.reset();
  }

  onCloseAlert(): void {
    this.error = null;
  }

  // Dynamically Create Alert Component
  private showErrorAlert(errorMessage: string): void {
    // The line is valid TypeScript Code but it does not work,
    // as angular needs to perform all the wiring work to display it in the UI
    // const alertComponent = new AlertComponent();

    // To Dynamically Create a component, we can use Component Factory
    const alertComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(
      alertComponentFactory
    );

    // Instance gives the concrete properties of the actual component
    componentRef.instance.message = errorMessage;
    this.closeSubscription = componentRef.instance.closeAlert.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
