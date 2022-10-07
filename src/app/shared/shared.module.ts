import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertComponent } from './component/alert/alert.component';
import { SpinnerComponent } from './component/spinner/spinner.component';

import { DropdownDirective } from './directive/dropdown.directive';
import { PlaceHolderDirective } from './directive/placeholder.directive';

@NgModule({
  declarations: [
    SpinnerComponent,
    AlertComponent,
    // Directives
    DropdownDirective,
    PlaceHolderDirective,
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    SpinnerComponent,
    AlertComponent,
    // Directives
    DropdownDirective,
    PlaceHolderDirective,
  ],
})
export class SharedModule {}
