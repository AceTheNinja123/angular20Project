import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, DatasetComponent } from 'echarts/components';
import { LineChart, BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
// This is insperation from https://echarts.apache.org/examples/en/editor.html?c=mix-line-bar
echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, DatasetComponent, LineChart, BarChart, CanvasRenderer]);

@Component({
  selector: 'app-line-and-column-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './LineAndColumn.component.html',
})
export class LineAndColumnChartComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const chart = echarts.init(this.chartRef.nativeElement);
      chart.setOption({
        title: { text: 'Tourist Attraction Statistics', subtext: 'Line and Column Chart', left: 'center' },
        tooltip: { trigger: 'axis', axisPointer: { type: 'cross', crossStyle: { color: '#999' } } },
        toolbox: { feature: { dataView: { show: true, readOnly: false }, magicType: { show: true, type: ['line', 'bar'] }, restore: { show: true }, saveAsImage: { show: true } } },
        grid: { top: '15%' },
        legend: { data: ['Annual Visitors (M)', 'Revenue (M USD)', 'Rating'] },
        xAxis: [
          {
            type: 'category',
            data: ['Eiffel Tower', 'Great Wall', 'Statue of Liberty', 'Colosseum', 'Taj Mahal', 'Pyramids of Giza'],
            axisPointer: { type: 'shadow' },
            axisLabel: { interval: 0 }
          }
        ],
        yAxis: [
          { type: 'value', name: 'Value (in Millions)', min: 0, max: 100, interval: 20, axisLabel: { formatter: '{value} M' } },
          { type: 'value', name: 'Rating', min: 0, max: 5, interval: 1, axisLabel: { formatter: '{value} / 5' } }
        ],
        series: [
          {
            name: 'Annual Visitors (M)',
            type: 'bar',
            tooltip: { valueFormatter: function (value: number) { return value + ' M'; } },
            data: [7, 20, 4, 5.2, 8, 3.3]
          },
          {
            name: 'Revenue (M USD)',
            type: 'bar',
            tooltip: { valueFormatter: function (value: number) { return value + ' M USD'; } },
            data: [95, 30, 1, 72, 1.5, 14.7]
          },
          {
            name: 'Rating',
            type: 'line',
            yAxisIndex: 1,
            tooltip: { valueFormatter: function (value: number) { return value + ' / 5'; } },
            data: [4.6, 4.4, 4.7, 4.5, 4.5, 4.6]
          }
        ]
      });
    }
  }
}