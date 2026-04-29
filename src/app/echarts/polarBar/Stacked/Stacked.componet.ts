import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, PolarComponent } from 'echarts/components';
import { LineChart, BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { styleText } from 'util';
// This is insperation from https://echarts.apache.org/examples/en/editor.html?c=bar-polar-stack
echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, LineChart, BarChart, PolarComponent, CanvasRenderer]);

@Component({
  selector: 'app-stacked',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Stacked.component.html',
})
export class StackedComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const chart = echarts.init(this.chartRef.nativeElement);

      chart.setOption({
        title: {
          text: 'Monster Sightings by Location',
          subtext: 'Stacked Polar Bar Chart',
          left: 'center',
          top: 0,
          textStyle: { fontSize: 18 }
        },
        angleAxis: { endAngle: -180 },
        radiusAxis: { type: 'category', data: ['Forest', 'Cave', 'Swamp', 'Mountain'], z: 10, axisLabel: { interval: 0 } },
        polar: { radius: [10, '80%'], center: ['50%', '50%'] },
        series: [
          { type: 'bar', data: [5, 2, 1, 3], coordinateSystem: 'polar', name: 'Goblins', stack: 'a', emphasis: { focus: 'series' } },
          { type: 'bar', data: [1, 4, 2, 1], coordinateSystem: 'polar', name: 'Ogres', stack: 'a', emphasis: { focus: 'series' } },
          { type: 'bar', data: [0, 1, 3, 5], coordinateSystem: 'polar', name: 'Trolls', stack: 'a', emphasis: { focus: 'series' } }
        ],
        legend: { show: true, data: ['Goblins', 'Ogres', 'Trolls'] }
      });
    }
  }
}