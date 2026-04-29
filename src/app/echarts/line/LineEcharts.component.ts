import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//Line Graphs
import { StackedLineComponent } from './StackedLine/StackedLine.componet';
import { GradientStackedAreaChartComponent } from './GradientStackedAreaChart/GradientStackedAreaChart.componet';
import { BumpChartComponent } from './BumpChart/BumpChart.componet';
import { StepLineComponent } from './StepLine/StepLine.componet';
import { YAxisComponent } from './YAxisChart/YAxis.componet';

@Component({
  selector: 'app-Line-echarts',
  standalone: true,
  imports: [StackedLineComponent, GradientStackedAreaChartComponent, BumpChartComponent, StepLineComponent, YAxisComponent, CommonModule],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="block">
            <app-stacked-line></app-stacked-line>
          </div>
        </div>
        <div class="col-md-6">
          <div class="block">
            <app-step-line></app-step-line>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="block">
            <app-gradient-stacked-area-chart></app-gradient-stacked-area-chart>
          </div>
        </div>
        <div class="col-md-6">
          <div class="block">
            <app-bump-chart></app-bump-chart>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="block">
            <app-y-axis></app-y-axis>
          </div>
        </div>
      </div>
      <div class="bottomBlock"></div>
    </div>
  `,
  styles: []
})
export class LineEcharts { }