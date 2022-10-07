import { Directive, ViewContainerRef } from '@angular/core';

/**
 * Access the container reference where this directive is placed
 * Not only we get the access to the reference but we also can add/edit whatever
 * is in the reference element
 */

@Directive({
  selector: '[appPlaceHolder]',
})
export class PlaceHolderDirective {
  // Property is declared as `public` so that we can access the viewContainer reference
  // from outside.
  constructor(public viewContainerRef: ViewContainerRef) {}
}
