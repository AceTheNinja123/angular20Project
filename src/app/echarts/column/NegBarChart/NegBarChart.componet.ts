import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, DatasetComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
// This is insperation from https://echarts.apache.org/examples/en/editor.html?c=bar-negative2
echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]);

@Component({
  selector: 'app-neg-bar-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './NegBarChart.component.html',
})
export class NegBarChartComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const chart = echarts.init(this.chartRef.nativeElement);

      chart.setOption({
        title: { text: 'Drinks Popularity', subtext: 'Change from Last Year', left: 'center' },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { top: 80, bottom: 30 },
        xAxis: {          type: 'value',          position: 'top',          splitLine: { lineStyle: { type: 'dashed' } }        },
        yAxis: {
          type: 'category',
          axisLine: { show: false },
          axisLabel: { show: true },
          axisTick: { show: false },
          splitLine: { show: false },
          data: ['Coffee', 'Green Tea', 'Soda', 'Orange Juice', 'Energy Drink', 'Milkshake', 'Smoothie', 'Sparkling Water', 'Iced Tea', 'Hot Chocolate']
        },
        series: [
          {
            name: 'Popularity Change',
            type: 'bar',
            stack: 'Total',
            label: { show: true, formatter: '{c}%' },
            itemStyle: { color: function (params: any) { return params.value < 0 ? '#dc3545' : '#28a745'; } },
            data: [-12, 8, -18, 15, 22, -6, 17, 9, -10, 5]
          }
        ]
      });
    }
  }
}