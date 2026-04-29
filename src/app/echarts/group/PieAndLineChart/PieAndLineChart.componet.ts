import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, DatasetComponent } from 'echarts/components';
import { LineChart, PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
// This is insperation from https://echarts.apache.org/examples/en/editor.html?c=area-stack-gradient&theme=dark
echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, DatasetComponent, LineChart, PieChart, CanvasRenderer]);

@Component({
  selector: 'app-pie-and-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './PieAndLineChart.component.html',
})
export class PieAndLineChartComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const chart = echarts.init(this.chartRef.nativeElement);
      chart.on('updateAxisPointer', function (event: any) {
        const xAxisInfo = event.axesInfo?.[0];
        if (xAxisInfo) {
          const dimension = xAxisInfo.value; // category name
          chart.setOption({            series: { id: 'pie', label: { formatter: '{b}: {@' + dimension + '} ({d}%)' }, encode: { value: dimension, tooltip: dimension } }          });
        }
      });
      chart.setOption({
        title: { text: 'Vehicle Sales Over Time', subtext: 'pie and line chart', left: 'center' },
        legend: { data: ['Sedan', 'SUV', 'Hatchback', 'Pickup Truck',] },
        tooltip: { trigger: 'axis', showContent: false },
        dataset: {
          source: [
            ['vehicle', '2012', '2013', '2014', '2015', '2016', '2017'],
            ['Sedan', 120, 132, 145, 160, 155, 170],
            ['SUV', 90, 110, 150, 200, 250, 310],
            ['Hatchback', 140, 135, 130, 125, 120, 115],
            ['Pickup Truck', 80, 95, 105, 130, 145, 160]
          ]
        },
        xAxis: { type: 'category' },
        yAxis: { gridIndex: 0 },
        grid: { top: '55%' },
        series: [
          { type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
          { type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
          { type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
          { type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
          {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '25%'],
            emphasis: { focus: 'self' },
            label: { formatter: '{b}: {@2012} ({d}%)' },
            encode: { itemName: 'vehicle', value: '2012', tooltip: '2012' }
          }
        ]
      });
    }
  }
}