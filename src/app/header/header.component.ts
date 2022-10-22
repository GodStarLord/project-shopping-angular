import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../auth/model/user.model';

import { AuthService } from '../auth/service/auth.service';
import { DataStorageService } from '../shared/service/data-storage.service';

import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private dataService: DataStorageService,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('auth')
      .pipe(
        map((authState) => {
          return authState.user;
        })
      )
      .subscribe((user) => (this.isAuthenticated = !!user));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSaveData(): void {
    this.dataService.storeRecipes();
  }

  onFetchData(): void {
    this.dataService.fetchRecipes().subscribe();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
