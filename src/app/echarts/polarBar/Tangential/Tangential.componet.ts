import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, PolarComponent } from 'echarts/components';
import { LineChart, BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
// This is insperation from https://echarts.apache.org/examples/en/editor.html?c=bar-polar-label-tangential
echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, LineChart, BarChart, PolarComponent, CanvasRenderer]);

@Component({
  selector: 'app-tangential',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Tangential.component.html',
})
export class TangentialComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const chart = echarts.init(this.chartRef.nativeElement);

      chart.setOption({
        colorBy: 'data',
        title: [{ text: 'Bird Sightings', subtext: 'Tangential Chart', top: 0, }],
        polar: { radius: [10, '80%'], center: ['50%', '55%'] },
        angleAxis: { max: 30, startAngle: 90 },
        radiusAxis: {
          type: 'category',
          data: ['Eagles', 'Sparrows', 'Robins', 'Pigeons'],
          axisLabel: { interval: 0 }
        },
        tooltip: {},
        series: {
          type: 'bar',
          data: [5, 20, 15, 25],
          coordinateSystem: 'polar',
          name: 'Sightings',
          stack: 'a',
        }
      });
    }
  }
}