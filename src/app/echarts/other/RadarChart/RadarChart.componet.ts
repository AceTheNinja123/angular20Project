import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TitleComponent, TooltipComponent, VisualMapComponent, ToolboxComponent, GeoComponent, LegendComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
//this insporation from https://echarts.apache.org/examples/en/editor.html?c=radar
echarts.use([TitleComponent, TooltipComponent, VisualMapComponent, ToolboxComponent, GeoComponent, RadarChart, LegendComponent]);

@Component({
  selector: 'app-radar-chart',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './RadarChart.component.html'
})
export class RadarChartComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) { }

  ngAfterViewInit() {

    if (!isPlatformBrowser(this.platformId)) return;

    const chart = echarts.init(this.chartRef.nativeElement);

    const option = {
      title: { text: 'Skill Assessment Comparison', left: 'center', top: 20 },
      tooltip: { trigger: 'item' },
      legend: { data: ['Junior Developer', 'Senior Developer'], bottom: 20 },
      radar: {
        radius: '65%',
        indicator: [{ name: 'Coding', max: 100 }, { name: 'Debugging', max: 100 }, { name: 'Communication', max: 100 }, { name: 'System Design', max: 100 }, { name: 'Mentoring', max: 100 }, { name: 'Testing', max: 100 }],
        shape: 'circle',
        splitNumber: 5,
        axisName: { color: 'rgb(138, 25, 25)' },
        splitLine: {
          lineStyle: {
            color: [
              'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
              'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
              'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
            ].reverse()
          }
        },
        splitArea: { show: false },
        axisLine: { lineStyle: { color: 'rgba(238, 102, 102, 0.5)' } }
      },
      series: [
        {
          name: 'Skills vs Role',
          type: 'radar',
          data: [
            { value: [90, 75, 60, 40, 30, 85], name: 'Junior Developer', areaStyle: { opacity: 0.3, color: '#80ff7c' }, itemStyle: { color: '#87ff7c' } },
            { value: [95, 90, 95, 85, 90, 80], name: 'Senior Developer', areaStyle: { opacity: 0.3, color: '#d055c6' }, itemStyle: { color: '#d055c0' } }
          ]
        }
      ]
    };

    chart.setOption(option);

  }
}