import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
// This is insperation from https://echarts.apache.org/examples/en/editor.html?c=area-stack-gradient&theme=dark
echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, LineChart, CanvasRenderer]);

@Component({
  selector: 'app-gradient-stacked-area-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './GradientStackedAreaChart.component.html',
})
export class GradientStackedAreaChartComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const chart = echarts.init(this.chartRef.nativeElement);

      chart.setOption({
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        title: { text: 'Gradient Stacked Area Chart' },
        tooltip: { trigger: 'axis', axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985' } } },
        legend: { data: ['Gaming', 'Sports', 'Reading', 'Traveling', 'Cooking'] },
        toolbox: { feature: { saveAsImage: {} } },
        xAxis: [
          {
            label: { show: true },
            name: 'Age Groups',
            nameLocation: 'middle',
            nameGap: 30,
            type: 'category',
            boundaryGap: false,
            data: ['10-17', '18-25', '26-35', '36-45', '46-55', '56-65', '65+']
          }
        ],
        yAxis: [{ type: 'value', name: 'Number of People (Thousands)', nameLocation: 'middle', nameGap: 50 }],
        series: [
          {
            name: 'Gaming',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: { width: 0 },
            showSymbol: false,
            areaStyle: { opacity: 0.8, color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgb(128, 255, 165)' }, { offset: 1, color: 'rgb(1, 191, 236)' }]) },
            emphasis: { focus: 'series' },
            data: [320, 400, 350, 200, 120, 80, 40]
          },
          {
            name: 'Sports',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: { width: 0 },
            showSymbol: false,
            areaStyle: { opacity: 0.8, color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgb(0, 221, 255)' }, { offset: 1, color: 'rgb(77, 119, 255)' }]) },
            emphasis: { focus: 'series' },
            data: [200, 350, 300, 250, 180, 120, 60]
          },
          {
            name: 'Reading',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: { width: 0 },
            showSymbol: false,
            areaStyle: { opacity: 0.8, color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgb(55, 162, 255)' }, { offset: 1, color: 'rgb(116, 21, 219)' }]) },
            emphasis: { focus: 'series' },
            data: [150, 220, 280, 300, 320, 290, 250]
          },
          {
            name: 'Traveling',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: { width: 0 },
            showSymbol: false,
            areaStyle: { opacity: 0.8, color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgb(255, 0, 135)' }, { offset: 1, color: 'rgb(135, 0, 157)' }]) },
            emphasis: { focus: 'series' },
            data: [50, 180, 300, 350, 330, 260, 180]
          },
          {
            name: 'Cooking',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: { width: 0 },
            showSymbol: false,
            label: { show: true, position: 'top' },
            areaStyle: { opacity: 0.8, color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgb(255, 191, 0)' }, { offset: 1, color: 'rgb(224, 62, 76)' }]) },
            emphasis: { focus: 'series' },
            data: [40, 120, 200, 280, 350, 370, 320]
          }
        ]
      });
    }
  }
}