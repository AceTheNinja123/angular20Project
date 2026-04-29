import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, DatasetComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
// This is insperation from https://echarts.apache.org/examples/en/editor.html?c=bar-gradient
echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]);

@Component({
  selector: 'app-feature-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './FeatureChart.component.html',
})
export class FeatureChartComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const chart = echarts.init(this.chartRef.nativeElement);
      let dataAxis = ['Smartphone', 'Laptop', 'Tablet', 'Smartwatch', 'Headphones', 'Camera', 'Console', 'Charger'];
      let data = [450, 380, 320, 290, 250, 210, 400, 100];
      let yMax = 500;
      let dataShadow = [];
      for (let i = 0; i < data.length; i++) {        dataShadow.push(yMax);      }
      chart.setOption({
        title: {          text: 'Electronics Sales Analysis',          subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'        },
        xAxis: {
          data: dataAxis,
          axisLabel: { inside: true, color: '#fff', rotate: 90 },
          axisTick: { show: false },
          axisLine: { show: false },
          z: 10
        },
        yAxis: { axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: '#999' } },
        dataZoom: [{ type: 'inside' }],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#ffe066' },
                { offset: 0.5, color: '#ffc107' },
                { offset: 1, color: '#b28704' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#b28704' },
                  { offset: 0.7, color: '#ffc107' },
                  { offset: 1, color: '#ffe066' }
                ])
              }
            },
            data: data
          }
        ]
      });
      // Enable data zoom when user click bar.
      const zoomSize = 6;
      chart.on('click', function (params) {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        chart.dispatchAction({
          type: 'dataZoom',
          startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        });
      });
    }
  }
}