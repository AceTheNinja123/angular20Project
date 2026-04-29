import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
// This is insperation from https://echarts.apache.org/examples/en/editor.html?c=line-y-category
echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, PieChart, CanvasRenderer]);

@Component({
  selector: 'app-nested',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Nested.component.html',
})
export class NestedComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const chart = echarts.init(this.chartRef.nativeElement);

      chart.setOption({
        tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
        legend: { data: ['Marvel', 'Star Wars', 'Harry Potter', 'Iron Man', 'Captain America', 'Thor', 'Luke Skywalker', 'Darth Vader', 'Yoda', 'Hermione Granger', 'Ron Weasley', 'Albus Dumbledore'] },
        series: [
          {
            name: 'Franchise',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            label: { position: 'inner', fontSize: 14 },
            labelLine: { show: false },
            data: [{ value: 2000, name: 'Marvel' }, { value: 1500, name: 'Star Wars' }, { value: 1100, name: 'Harry Potter', selected: true }]
          },
          {
            name: 'Character',
            type: 'pie',
            radius: ['45%', '40%'],
            labelLine: { length: 50 },
            label: {
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#F6F8FC',
              borderColor: '#8C8D8E',
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: { color: '#6E7079', lineHeight: 22, align: 'center' },
                hr: { borderColor: '#8C8D8E', width: '100%', borderWidth: 1, height: 0 },
                b: { color: '#4C5058', fontSize: 14, fontWeight: 'bold', lineHeight: 33 },
                per: { color: '#fff', backgroundColor: '#4C5058', padding: [3, 4], borderRadius: 4 }
              }
            },
            data: [{ value: 650, name: 'Captain America' }, { value: 800, name: 'Iron Man' }, { value: 550, name: 'Thor' }, { value: 700, name: 'Luke Skywalker' }, { value: 800, name: 'Darth Vader' }, { value: 450, name: 'Yoda' }, { value: 500, name: 'Hermione Granger' }, { value: 400, name: 'Ron Weasley' }, { value: 600, name: 'Albus Dumbledore' }]
          }
        ]
      });
    }
  }
}