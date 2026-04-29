import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
// This is insperation from https://echarts.apache.org/examples/en/editor.html?c=line-y-category
echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, LineChart, CanvasRenderer]);

@Component({
  selector: 'app-y-axis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './YAxis.component.html',
})
export class YAxisComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const chart = echarts.init(this.chartRef.nativeElement);

      chart.setOption({
        title: { text: 'Active Players Per Day', subtext: 'Y Axis Chart' },
        legend: { data: ['Number of Players'] },
        tooltip: { trigger: 'axis', formatter: 'Players : <br/>{b} : {c}' },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: {
          type: 'value',
          name: 'Number of Players',
          nameLocation: 'center',
          nameGap: 50,
          nameTextStyle: { fontSize: 16, fontWeight: 'bold' },
          // axisLabel: { formatter: '{value} °C' }
        },
        yAxis: {
          type: 'category',
          axisLine: { onZero: false },
          name: 'Day of Week',
          nameLocation: 'center',
          nameGap: 50,
          // axisLabel: { formatter: '{value} km' },
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        series: [
          {
            name: 'Number of Players',
            type: 'line',
            symbolSize: 10,
            symbol: 'circle',
            itemStyle: { color: '#09ff00', borderColor: '#07cc00', borderWidth: 1 },
            smooth: true,
            lineStyle: { width: 3, color: '#09ff00', shadowColor: 'rgba(60, 255, 0, 0.3)', shadowBlur: 10, shadowOffsetY: 8 },
            data: [120, 150, 180, 200, 250, 300, 280]
          }
        ]
      });
    }
  }
}