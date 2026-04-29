import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
// This is insperation from https://echarts.apache.org/examples/en/editor.html?c=line-step&theme=dark
echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, LineChart, CanvasRenderer]);

@Component({
  selector: 'app-step-line',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './StepLine.component.html',
})
export class StepLineComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const chart = echarts.init(this.chartRef.nativeElement);

      chart.setOption({
        title: { text: 'Monster Spawns in a Game', subtext: 'Step Line' },
        tooltip: { trigger: 'axis' },
        legend: { data: ['Spawn Start', 'Spawn Middle', 'Spawn End'] },
        grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
        toolbox: { feature: { saveAsImage: {} } },
        xAxis: { type: 'category', name: 'Days of the Week', nameLocation: 'middle', nameGap: 30, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
        yAxis: { type: 'value', name: 'Number of Monsters Spawned', nameLocation: 'middle', nameGap: 40 },
        series: [
          { name: 'Spawn Start', type: 'line', step: 'start', data: [5, 7, 6, 8, 5, 9, 10] },
          { name: 'Spawn Middle', type: 'line', step: 'middle', data: [12, 15, 14, 18, 12, 20, 22] },
          { name: 'Spawn End', type: 'line', step: 'end', data: [20, 25, 22, 28, 25, 30, 32] }
        ]
      });
    }
  }
}