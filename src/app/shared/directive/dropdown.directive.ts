import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

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

  // Listen to the click event on whole document

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
  constructor(private elRef: ElementRef) {}
}
