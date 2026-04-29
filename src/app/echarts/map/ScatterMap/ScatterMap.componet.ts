import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {  TitleComponent,  TooltipComponent,  VisualMapComponent,  ToolboxComponent,  GeoComponent} from 'echarts/components';
import { ScatterChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
//this insporation from https://echarts.apache.org/examples/en/editor.html?c=geo-choropleth-scatter
echarts.use([TitleComponent, TooltipComponent, VisualMapComponent, ToolboxComponent, GeoComponent, ScatterChart, CanvasRenderer]);

@Component({
  selector: 'app-world-map',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `<div #chartContainer style="height:700px;width:100%"></div>`
})
export class WorldMapComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) { }

  ngAfterViewInit() {

    if (!isPlatformBrowser(this.platformId)) return;

    const chart = echarts.init(this.chartRef.nativeElement);
    const cityData = [
      { name: 'New York', value: [-74.006, 40.7128, 18900000] },
      { name: 'London', value: [-0.1276, 51.5072, 9500000] },
      { name: 'Tokyo', value: [139.6917, 35.6895, 37400000] },
      { name: 'Paris', value: [2.3522, 48.8566, 11000000] },
      { name: 'Cape Town', value: [18.4241, -33.9249, 4600000] },
      { name: 'Sydney', value: [151.2093, -33.8688, 5300000] },
      { name: 'Beijing', value: [116.4074, 39.9042, 21500000] },
      { name: 'São Paulo', value: [-46.6333, -23.5505, 22400000] }
    ];

    chart.showLoading();

    // always request the JSON from the web root so that the path is
    // correct regardless of the current router URL.  Relative paths without
    // a leading slash are resolved against the current route, which can
    // result in 404s when navigating to a non-root path such as "/echarts".
    this.http.get('/assets/maps/world.json').subscribe({
      next: (geoJSON: any) => {
        echarts.registerMap('world', geoJSON);
        chart.hideLoading();

        chart.setOption({
          title: { text: 'World City Population', subtext: 'Bubble Map', left: 'center' },
          tooltip: {
            trigger: 'item',
            formatter: (params: any) => `${params.name}<br/>Population: ${params.value[2].toLocaleString()}`
          },
          geo: {
            map: 'world',
            roam: true,
            itemStyle: { areaColor: '#e6f2ff', borderColor: '#999' },
            emphasis: { itemStyle: { areaColor: '#cce5ff' } }
          },
          visualMap: {
            min: 1000000,
            max: 40000000,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: 20,
            text: ['High Population', 'Low Population'],
            dimension: 2,
            inRange: { symbolSize: [5, 40] }
          },
          series: [
            {
              name: 'City Population',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: cityData,
              encode: { value: 2 },
              itemStyle: { color: '#ff5722' }
            }
          ]
        });
      },
      error: (err) => {
        console.error('Map failed to load:', err);
        chart.hideLoading();
      }
    });

  }
}