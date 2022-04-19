import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

  //public porque se accede desde afuera
  //El viewContainerRef es el que nos va a indicar donde podemos crear el componente en pantalla.
  constructor(public viewContainerRef: ViewContainerRef) { }

}
