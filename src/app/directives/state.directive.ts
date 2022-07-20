import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appState]',
})
export class StateDirective implements OnChanges {
  @Input() appState: String = '';

  constructor(private elem: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    let bg: string = '';
    let color: string = '';

    if (this.appState === 'approved') {
      bg = 'hsl(120, 100%, 90%)';
      color = 'hsl(120, 100%, 25%)';
    } else {
      bg = 'hsl(0, 100%, 90%)';
      color = 'hsl(0, 100%, 50%)';
    }

    this.renderer.setStyle(this.elem.nativeElement, 'background-color', bg);
    this.renderer.setStyle(this.elem.nativeElement, 'color', color);
  }
}
