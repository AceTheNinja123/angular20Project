import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//Map Graphs
import { WorldMapComponent } from './ScatterMap/ScatterMap.componet';
import { ChoroplethMapComponent } from './ChoroplethMap/ChoroplethMap.componet';

@Component({
  selector: 'app-map-echarts',
  standalone: true,
  imports: [WorldMapComponent, ChoroplethMapComponent, CommonModule],
  template: `
    <div class="container">
      <div class="row">
      <div class="row">
        <div class="col-md-6">
          <div class="block">
            <app-choropleth-world-map></app-choropleth-world-map>
          </div>
        </div>
        <div class="col-md-6">
          <div class="block">
            <app-world-map></app-world-map>
          </div>
        </div>
      </div>
      <div class="bottomBlock"></div>
    </div>
  `,
  styles: []
})
export class MapEcharts { }