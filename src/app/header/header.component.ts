import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/service/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent {
  constructor(private dataService: DataStorageService) {}

  onSaveData(): void {
    this.dataService.storeRecipes();
  }

  onFetchData(): void {
    this.dataService.fetchRecipes().subscribe();
  }
}
