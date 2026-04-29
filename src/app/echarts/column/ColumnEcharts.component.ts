import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//Column Graphs
import { BasicChartComponent } from './BasicChart/BasicChart.componet';
import { NegBarChartComponent } from './NegBarChart/NegBarChart.componet';
import { FeatureChartComponent } from './FeatureChart/FeatureChart.componet';
import { StackedBarChartComponent } from './StackedBarChart/StackedBarChart.componet';

@Component({
  selector: 'app-column-echarts',
  standalone: true,
  imports: [BasicChartComponent, NegBarChartComponent, FeatureChartComponent, StackedBarChartComponent, CommonModule],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="block">
            <app-basic-chart></app-basic-chart>
          </div>
        </div>
        <div class="col-md-6">
          <div class="block">
            <app-neg-bar-chart></app-neg-bar-chart>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="block">
            <app-feature-chart></app-feature-chart>
          </div>
        </div>
        <div class="col-md-6">
          <div class="block">
            <app-stacked-bar-chart></app-stacked-bar-chart>
          </div>
        </div>
      </div>
      <div class="bottomBlock"></div>
    </div>
  `,
  styles: []
})
export class ColumnEcharts { }