import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '../auth/model/user.model';

import { AuthService } from '../auth/service/auth.service';
import { DataStorageService } from '../shared/service/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private subscription: Subscription;

  constructor(
    private dataService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe(
      (user) => (this.isAuthenticated = !!user)
    );
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
}
