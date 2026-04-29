import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//Group Graphs
import { PieAndLineChartComponent } from './PieAndLineChart/PieAndLineChart.componet';
import { LineAndColumnChartComponent } from './LineAndColumnChart/LineAndColumn.componet';

@Component({
  selector: 'app-group-echarts',
  standalone: true,
  imports: [PieAndLineChartComponent, LineAndColumnChartComponent, CommonModule],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="block">
            <app-pie-and-line-chart></app-pie-and-line-chart>
          </div>
        </div>
        <div class="col-md-6">
          <div class="block">
            <app-line-and-column-chart></app-line-and-column-chart>
          </div>
        </div>
      </div>
      <div class="bottomBlock"></div>
    </div>
  `,
  styles: []
})
export class GroupEcharts { }