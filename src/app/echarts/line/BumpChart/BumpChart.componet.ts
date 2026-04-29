import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
// This is insperation from https://echarts.apache.org/examples/en/editor.html?c=bump-chart&theme=dark
echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, LineChart, CanvasRenderer]);

@Component({
  selector: 'app-bump-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './BumpChart.component.html',
})
export class BumpChartComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const chart = echarts.init(this.chartRef.nativeElement);

      chart.setOption({
        title: { text: 'Dungen and Dragons Class Ranking', subtext: 'Bump Chart' },
        tooltip: { trigger: 'item' },
        grid: { left: 30, right: 110, bottom: 30, containLabel: true },
        toolbox: { feature: { saveAsImage: {} } },
        xAxis: {
          type: 'category',
          name: 'Years',
          nameLocation: 'middle',
          nameGap: 60,
          splitLine: { show: true },
          axisLabel: { margin: 30, fontSize: 16 },
          boundaryGap: false,
          data: ['2018', '2019', '2020', '2021', '2022', '2023']
        },
        yAxis: {
          type: 'value',
          name: 'Ranking',
          nameLocation: 'middle',
          nameGap: 60,
          axisLabel: { margin: 30, fontSize: 16, formatter: '#{value}' },
          inverse: true,
          interval: 1,
          min: 1,
          max: 5
        },
        series: [
          { name: 'Fighter', type: 'line', smooth: true, symbolSize: 10, data: [1, 2, 2, 3, 2, 1] },
          { name: 'Wizard', type: 'line', smooth: true, symbolSize: 10, data: [2, 1, 1, 2, 1, 2] },
          { name: 'Rogue', type: 'line', smooth: true, symbolSize: 10, data: [3, 3, 4, 1, 3, 3] },
          { name: 'Cleric', type: 'line', smooth: true, symbolSize: 10, data: [4, 5, 3, 4, 4, 4] },
          { name: 'Barbarian', type: 'line', smooth: true, symbolSize: 10, data: [5, 4, 5, 5, 5, 5] }
        ]
      });
    }
  }
}