import { Component } from '@angular/core';
import { BoardComponent } from '@components/ticTacToe/board/board.component';
import { TicTacToeRoutingModule } from './TicTacToe-routing.module';
// this took insporation from https://github.com/fireship-io/angular-tic-tac-toe
@Component({
  selector: 'app-tic-tac-toe',
  imports: [BoardComponent, TicTacToeRoutingModule],
  templateUrl: './TicTacToe.component.html',
  styleUrls: ['./TicTacToe.component.scss'],
})
export class TicTacToeComponent {  title = 'myTicTacToe';}