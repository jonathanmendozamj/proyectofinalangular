import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appFontSize]'
})
export class FontSizeDirective implements OnInit {
  @Input('appFontSize') fontSize!: string;

  constructor(private element: ElementRef) { 
    
  }

  ngOnInit(): void {
    console.log(this.fontSize);
    this.element.nativeElement.style.fontSize = (this.fontSize || '20px');
  }

}