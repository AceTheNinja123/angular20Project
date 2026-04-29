import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-square',
  template: `
    @if(!value) {<button class="square">{{ value }}</button>}
    @if(value == 'X') {<button class="square x">{{ value }}</button>}
    @if(value == 'O') {<button class="square o">{{ value }}</button>}
  `,
  standalone: true,
  imports: [CommonModule],
  styles: [
    '.square { width: 100%; height: 100%; font-size: 5em !important; border: none; background: transparent; }',
    '.square.x { color: #1e7e34; font-weight: 700; }',
    '.square.o { color: #0f6674; font-weight: 700; }'
  ]
})
export class SquareComponent { @Input() value!: 'X' | 'O'; }
