import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//Pie Graphs
import { NestedComponent } from './Nested/Nested.componet';
import { BasicComponent } from './Basic/Basic.componet';
import { DoughnutComponent } from './Doughnut/Doughnut.componet';

@Component({
  selector: 'app-pie-echarts',
  standalone: true,
  imports: [NestedComponent, BasicComponent, DoughnutComponent, CommonModule],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="block">
            <app-basic></app-basic>
          </div>
        </div>
        <div class="col-md-6">
          <div class="block">
            <app-doughnut></app-doughnut>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="block">
            <app-nested></app-nested>
          </div>
        </div>
      </div>
      <div class="bottomBlock"></div>
    </div>
  `,
  styles: []
})
export class PieEcharts { }