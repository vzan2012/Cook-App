import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  // @HostBinding('class.show') isOpen: boolean = false;
  private isOpen: boolean = false;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elementRef.nativeElement === event.target && !this.isOpen ? true : false
    const dropDown = this.elementRef.nativeElement.nextElementSibling;

    this.isOpen ? this.renderer.addClass(dropDown, 'show') : this.renderer.removeClass(dropDown, 'show')
  }


}
