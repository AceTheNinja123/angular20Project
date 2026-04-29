import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, BarChart, CanvasRenderer]);

@Component({
  selector: 'app-stacked-bar-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './StackedBarChart.component.html',
})
export class StackedBarChartComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {

    if (!isPlatformBrowser(this.platformId)) return;

    const chart = echarts.init(this.chartRef.nativeElement);
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = { 'Direct': [100, 302, 301, 334, 390, 330, 320], 'Mail Ad': [320, 132, 182, 212, 90, 230, 210], 'Affiliate Ad': [220, 182, 191, 201, 290, 330, 310], 'Video Ad': [150, 212, 201, 154, 190, 330, 410], 'Search Engine': [820, 832, 901, 934, 1290, 1330, 1320] };

    // Calculate totals per day
    const totals = days.map((_, i) => Object.values(data).reduce((sum, arr) => sum + arr[i], 0));

    // Convert to percentage
    const series = Object.entries(data).map(([name, values]) => ({
      name,
      type: 'bar',
      stack: 'total',
      label: { show: true, formatter: (params: any) => (params.value * 100).toFixed(1) + '%' },
      data: values.map((v, i) => v / totals[i])
    }));

    chart.setOption({
      title: { text: 'Ad Sources', subtext: 'Stacked Bar Chart' },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { bottom: 0 },
      grid: { left: 80, right: 40, top: 80, bottom: 80, containLabel: true },
      xAxis: { type: 'category', data: days },
      yAxis: { type: 'value', axisLabel: { formatter: (value: number) => (value * 100) + '%' } },
      series
    });
  }
}