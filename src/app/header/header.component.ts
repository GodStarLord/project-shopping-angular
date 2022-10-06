import { Component } from '@angular/core';

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
}
