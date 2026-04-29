import { Component } from '@angular/core';
import { ToDoList } from './toDoList/ToDoList.component';
import { DropList } from './dropList/DropList.component';
import { JokeGenerator } from './jokeGenerator/JokeGenerator.componet';
import { SnakeGameComponent } from './snakeGame/SnakeGame.component';
import { ColourPickerComponent } from './colorPicker/ColourPicker.component';
import { TableWithDateRangeComponent } from './tableWithDateRange/TableWithDateRange.component';
import { CompareDataComponent } from './compareData/CompareData.component';
import { RockPaperScissorsGameComponent } from './rockPaperScissorsGame/RockPaperScissorsGame.component';
import { CurrencyConverterComponent } from './currencyConverter/CurrencyConverter.component';
import { CalculatorComponent } from './calculator/Calculator.component';
import { TicTacToeComponent } from './ticTacToe/TicTacToe.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grid-demo',
  standalone: true,
  imports: [
    ToDoList,
    DropList,
    JokeGenerator,
    SnakeGameComponent,
    ColourPickerComponent,
    TableWithDateRangeComponent,
    CompareDataComponent,
    RockPaperScissorsGameComponent,
    CurrencyConverterComponent,
    CalculatorComponent,
    CommonModule,
    TicTacToeComponent
  ],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="block">
            <app-to-do-list></app-to-do-list>
          </div>
        </div>
        <div class="col-md-6">
          <div class="block">
            <app-drop-list></app-drop-list>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="block">
            <app-joke-generator></app-joke-generator>
          </div>
        </div>
        <div class="col-md-6">
          <div class="block">
            <app-snake-game></app-snake-game>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="block">
            <app-colour-picker></app-colour-picker>
          </div>
        </div>
        <div class="col-md-6">
          <div class="block">
            <app-table-with-date-range></app-table-with-date-range>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="block">
            <app-compare-data></app-compare-data>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="block">
            <app-rock-paper-scissors-game></app-rock-paper-scissors-game>
          </div>
        </div>
        <div class="col-md-6">
          <div class="block">
            <app-currency-converter></app-currency-converter>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="block">
            <app-calculator></app-calculator>
          </div>
        </div>
        <div class="col-md-6">
          <div class="block">
            <app-tic-tac-toe></app-tic-tac-toe>
          </div>
        </div>
      </div>
      <div class="bottomBlock"></div>
    </div>
  `,
  styles: []
})
export class GridDemo { }