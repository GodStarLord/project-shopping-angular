import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../auth/model/user.model';

import { DataStorageService } from '../shared/service/data-storage.service';

import { AppState } from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

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
    // this.dataService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }
}
