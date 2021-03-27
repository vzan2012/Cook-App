import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostBinding('class.show') isOpen: boolean = false;

  @HostListener('click') toggleOpen() {
    const dropDown = this.elementRef.nativeElement.nextElementSibling;

    if (!this.isOpen) {
      this.renderer.addClass(dropDown, 'show')
    } else {
      this.renderer.removeClass(dropDown, 'show')
    }


    this.isOpen = !this.isOpen
  }

}
