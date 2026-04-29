import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//Polar Bar Graphs
import { TangentialComponent } from './Tangential/Tangential.componet';
import { StackedComponent } from './Stacked/Stacked.componet';

@Component({
  selector: 'app-polar-bar-echarts',
  standalone: true,
  imports: [    TangentialComponent,    StackedComponent,    CommonModule  ],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="block">
            <app-tangential></app-tangential>
          </div>
        </div>
        <div class="col-md-6">
          <div class="block">
            <app-stacked></app-stacked>
          </div>
        </div>
      </div>
      <div class="bottomBlock"></div>
    </div>
  `,
  styles: []
})
export class PolarBarEcharts { }