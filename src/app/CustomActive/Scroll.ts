import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[CustomScroll]'
})
export class DraggableScrollDirective {
  constructor(private el: ElementRef, private elCheckout: ElementRef) {}
  clicked:boolean = false;

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    event.preventDefault();
    const scrollableElement = this.el.nativeElement;
    const scrollAmount = 300;
    scrollableElement.scrollLeft += this.clicked ? -scrollAmount: scrollAmount;
    this.clicked = !this.clicked;
  }
}


// @Directive({
//   selector: '[ActiveCheckOut]'
// })
// export class ActiveCheckout {
//   constructor(private elCheckout: ElementRef) {}
//   clicked:boolean = false;

//   @HostListener('contextCheckout', ['$event'])
//   onRightClickCheckOut(event: MouseEvent) {
//     event.preventDefault();
//     const scrollE = this.elCheckout.nativeElement;
//     const scrollAmount = 1215;
//     scrollE.scrollLeft += this.clicked? -scrollAmount: scrollAmount;
//     this.clicked = !this.clicked;
//   }

// }