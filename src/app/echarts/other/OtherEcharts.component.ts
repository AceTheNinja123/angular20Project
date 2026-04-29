import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//Other Graphs
import { ScatterComponent } from './Scatter/Scatter.componet';
import { RadarChartComponent } from './RadarChart/RadarChart.componet';
import { HeatmapComponent } from './Heatmap/Heatmap.componet';
import { LesMiserablesComponent } from './LesMiserables/LesMiserables.componet';
import { CirclePackingComponent } from './CirclePacking/CirclePacking.componet';
import { TreemapComponent } from './Treemap/Treemap.componet';
import { SunburstComponent } from './Sunburst/Sunburst.componet';
import { PictorialBarComponent } from './PictorialBar/PictorialBar.componet';
@Component({
  selector: 'app-other-echarts',
  standalone: true,
  imports: [ScatterComponent, RadarChartComponent, HeatmapComponent, LesMiserablesComponent, CirclePackingComponent, TreemapComponent, SunburstComponent, PictorialBarComponent, CommonModule],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="block">
            <app-scatter></app-scatter>
          </div>
        </div>
        <div class="col-md-6">
          <div class="block">
            <app-radar-chart></app-radar-chart>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="block">
            <app-heatmap></app-heatmap>
          </div>
        </div>
        <div class="col-md-6">
          <div class="block">
            <app-lesmiserables></app-lesmiserables>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="block">
            <app-circle-packing></app-circle-packing>
          </div>
        </div>
        <div class="col-md-6">
          <div class="block">
            <app-treemap></app-treemap>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="block">
            <app-sunburst></app-sunburst>
          </div>
        </div>
        <div class="col-md-6">
          <div class="block">
            <app-pictorial-bar></app-pictorial-bar>
          </div>
        </div>
      </div>
      <div class="bottomBlock"></div>
    </div>
  `,
  styles: []
})
export class OtherEcharts { }