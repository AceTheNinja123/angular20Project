import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent } from 'echarts/components';
import { SunburstChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { data } from './SunburstData'
// This is insperation from https://echarts.apache.org/examples/en/editor.html?c=sunburst-drink
echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, SunburstChart, CanvasRenderer]);

@Component({
  selector: 'app-sunburst',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Sunburst.component.html',
})
export class SunburstComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const chart = echarts.init(this.chartRef.nativeElement);

      chart.setOption({
        title: { text: 'Ganre, Actors and Movies', subtext: 'sunburst chart', textStyle: { fontSize: 14, align: 'center' }, subtextStyle: { align: 'center' }, },
        series: {
          type: 'sunburst',
          data: data,
          radius: [0, '90%'],
          center: ['50%', '55%'],
          sort: undefined,
          emphasis: { focus: 'ancestor' },
          levels: [
            {},
            { r0: '15%', r: '35%', itemStyle: { borderWidth: 2 }, label: { rotate: 'tangential' } },
            { r0: '35%', r: '70%', label: { align: 'right' } },
            { r0: '70%', r: '72%', label: { position: 'outside', padding: 3, silent: false }, itemStyle: { borderWidth: 3 } }
          ]
        }
      });
    }
  }
}