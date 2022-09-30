import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  /** [] => Attribute Selector => we can directly use name and omit [] */
  /**
   * selector: "appDropdown"
   * In this case we need to use as [appDropdown] in our template
   */
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  // Listen to the click event
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
