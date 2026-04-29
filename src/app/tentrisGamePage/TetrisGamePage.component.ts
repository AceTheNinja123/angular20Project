import { Component } from '@angular/core';
import { TetrisComponent } from '../tetris/Tetris.component';
import { CommonModule } from '@angular/common';
// this is insporated by https://github.com/trungvose/angular-tetris
@Component({
  selector: 'app-tetris-game-page',
  standalone: true,
  imports: [TetrisComponent, CommonModule],
  template: `
  <div class="TetrisGameContainer">
    <app-tetris></app-tetris>
  </div>
  <div class="bottomBlock"></div>
  `,
  styleUrls: ['../../../src/styles.css']
})
export class TetrisGamePage { }
