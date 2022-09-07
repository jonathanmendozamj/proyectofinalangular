import { Directive, ElementRef, Input, OnInit } from '@angular/core';

const defaultFontSize = '20px';

@Directive({
  selector: '[appFontSize]'
})
export class FontSizeDirective implements OnInit {
  @Input('appFontSize') fontSize!: string;

  constructor(private element: ElementRef) { 
    
  }

  ngOnInit(): void {
    this.element.nativeElement.style.fontSize = (this.fontSize || defaultFontSize);
  }

}