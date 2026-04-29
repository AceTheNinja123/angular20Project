import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
// This is insperation from https://echarts.apache.org/examples/en/editor.html?c=line-stack&theme=dark
echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, LineChart, CanvasRenderer]);

@Component({
  selector: 'app-stacked-line',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './StackedLine.component.html',
})
export class StackedLineComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const chart = echarts.init(this.chartRef.nativeElement);

      chart.setOption({
        title: { text: 'Groceries during the week', subtext: 'Stacked Line' },
        tooltip: { trigger: 'axis' },
        legend: { data: ['Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Beverages'], },
        grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
        toolbox: { feature: { saveAsImage: {} } },
        xAxis: { type: 'category', name: 'Days of the Week', nameLocation: 'middle', nameGap: 30, boundaryGap: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
        yAxis: { type: 'value', name: 'Amount Groceries Bought', nameLocation: 'middle', nameGap: 40 },
        series: [
          { name: 'Fruits', type: 'line', stack: 'Total', data: [50, 65, 80, 70, 90, 100, 120] },
          { name: 'Vegetables', type: 'line', stack: 'Total', data: [40, 55, 60, 50, 65, 70, 85] },
          { name: 'Dairy', type: 'line', stack: 'Total', data: [30, 35, 40, 38, 45, 50, 55] },
          { name: 'Bakery', type: 'line', stack: 'Total', data: [20, 25, 30, 28, 35, 40, 45] },
          { name: 'Beverages', type: 'line', stack: 'Total', data: [60, 70, 80, 75, 85, 95, 110] }
        ]
      });
    }
  }
}