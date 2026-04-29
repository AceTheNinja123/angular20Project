import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
// This is insperation from https://echarts.apache.org/examples/en/editor.html?c=pie-simple
echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, PieChart, CanvasRenderer]);

@Component({
  selector: 'app-basic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Basic.component.html',
})
export class BasicComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const chart = echarts.init(this.chartRef.nativeElement);

      chart.setOption({
        title: { text: 'Film Genres', subtext: 'Simple Pie Chart', left: 'center' },
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', left: 'left' },
        series: [
          {
            name: 'Genre',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 335, name: 'Action' },
              { value: 310, name: 'Comedy' },
              { value: 234, name: 'Drama' },
              { value: 135, name: 'Sci-Fi' },
              { value: 548, name: 'Horror' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    }
  }
}