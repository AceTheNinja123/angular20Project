import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TitleComponent, TooltipComponent, VisualMapComponent, CalendarComponent, LegendComponent } from 'echarts/components';
import { HeatmapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
//this insporation from https://echarts.apache.org/examples/en/editor.html?c=calendar-heatmap
echarts.use([TitleComponent, TooltipComponent, VisualMapComponent, CalendarComponent, HeatmapChart, CanvasRenderer, LegendComponent]);

@Component({
  selector: 'app-heatmap',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './Heatmap.component.html'
})
export class HeatmapComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { } // HttpClient was not used.

  ngAfterViewInit() {

    if (!isPlatformBrowser(this.platformId)) return;

    const chart = echarts.init(this.chartRef.nativeElement);

    function generateCheckInData(year: string) {
      const date = +echarts.time.parse(year + '-01-01');
      const end = +echarts.time.parse(+year + 1 + '-01-01');
      const dayTime = 3600 * 24 * 1000;
      const data = [];
      for (let time = date; time < end; time += dayTime) {
        const d = new Date(time);
        const dayOfWeek = d.getDay(); // 0 = Sunday, 6 = Saturday
        const month = d.getMonth(); // 0 = January, 11 = December

        // Base check-ins: random number between 20 and 80
        let checkIns = Math.floor(Math.random() * 61) + 20;

        // Weekend spike: more check-ins on Friday and Saturday
        if (dayOfWeek === 5) { checkIns += Math.floor(Math.random() * 91) + 50; }
        if (dayOfWeek === 6) { checkIns += Math.floor(Math.random() * 61) + 30; }

        // Summer holiday spike (June, July, August)
        if (month >= 5 && month <= 7) { checkIns += Math.floor(Math.random() * 71) + 30; }

        // End of year holiday spike (December)
        if (month === 11) { checkIns += Math.floor(Math.random() * 61) + 40; }

        data.push([echarts.time.format(time, '{yyyy}-{MM}-{dd}', false), checkIns]);
      }
      return data;
    }
    chart.setOption({
      title: { top: 30, left: 'center', text: 'Hotel Check-ins (2026)' },
      tooltip: {
        position: 'top',
        formatter: (p: any) => {
          const value = p.data[1];
          let label = '';
          if (value < 50) label = 'Very Quiet';
          else if (value < 100) label = 'Quiet';
          else if (value < 180) label = 'Normal';
          else if (value < 260) label = 'Busy';
          else if (value < 350) label = 'Very Busy';
          else label = 'Fully Booked';
          return `
            <b>${p.data[0]}</b><br/>
            Check-ins: ${value}<br/>
            Status: ${label}
          `;
        }
      },
      visualMap: {
        type: 'piecewise',
        orient: 'horizontal',
        bottom: 10,
        left: 'center',
        pieces: [
          { max: 50, label: 'Very Low', color: '#f2f0f7' },
          { min: 50, max: 100, label: 'Low', color: '#cbc9e2' },
          { min: 100, max: 180, label: 'Moderate', color: '#9e9ac8' },
          { min: 180, max: 260, label: 'Busy', color: '#756bb1' },
          { min: 260, max: 350, label: 'Very Busy', color: '#54278f' },
          { min: 350, label: 'Peak Season', color: '#2c115f' }
        ]
      },
      calendar: {
        top: 'center',
        left: 50,
        right: 100,
        cellSize: ['auto', 25],
        range: '2026',
        itemStyle: { borderWidth: 0.5 },
        yearLabel: { show: false }
      },
      series: [{ name: 'Check-ins', type: 'heatmap', coordinateSystem: 'calendar', data: generateCheckInData('2026') }]
    });
  }
}