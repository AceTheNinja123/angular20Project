import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent } from 'echarts/components';
import { PictorialBarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
// This is insperation from https://echarts.apache.org/examples/en/editor.html?c=pictorialBar-vehicle
import { faTent, faCompass, faBed, faFireBurner, faKitMedical } from '@fortawesome/free-solid-svg-icons';
echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, PictorialBarChart, CanvasRenderer]);

@Component({
  selector: 'app-pictorial-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './PictorialBar.component.html',
})
export class PictorialBarComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const chart = echarts.init(this.chartRef.nativeElement);

      const pathSymbols = { tent: 'path://' + faTent.icon[4], compass: 'path://' + faCompass.icon[4], sleeping_bag: 'path://' + faBed.icon[4], stove: 'path://' + faFireBurner.icon[4], kit_medical: 'path://' + faKitMedical.icon[4] };
      const labelSetting = { show: true, position: 'right', offset: [10, 0], fontSize: 16 };
      chart.setOption({
        title: { text: 'Camping Gear Sales (Unit: Thousands)', left: 'center', subtext: 'Pictorial Bar Chart Example', },
        legend: { data: ['2023', '2024'] },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { containLabel: true, left: 20 },
        yAxis: {
          data: ['Tents', 'Compass', 'Sleeping Bags', 'Camp Stoves', 'Medical Kits'],
          inverse: true,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { margin: 30, fontSize: 14 },
          axisPointer: { label: { show: true, margin: 30 } }
        },
        xAxis: { splitLine: { show: false }, axisLabel: { show: false }, axisTick: { show: false }, axisLine: { show: false } },
        series: [
          {
            name: '2023',
            type: 'pictorialBar',
            label: labelSetting,
            symbolRepeat: true,
            symbolSize: ['80%', '60%'],
            barCategoryGap: '40%',
            data: [
              { value: 85, symbol: pathSymbols.tent },
              { value: 120, symbol: pathSymbols.compass },
              { value: 95, symbol: pathSymbols.sleeping_bag },
              { value: 45, symbol: pathSymbols.stove },
              { value: 150, symbol: pathSymbols.kit_medical }
            ]
          },
          {
            name: '2024',
            type: 'pictorialBar',
            barGap: '10%',
            label: labelSetting,
            symbolRepeat: true,
            symbolSize: ['80%', '60%'],
            data: [
              { value: 110, symbol: pathSymbols.tent },
              { value: 135, symbol: pathSymbols.compass },
              { value: 105, symbol: pathSymbols.sleeping_bag },
              { value: 60, symbol: pathSymbols.stove },
              { value: 140, symbol: pathSymbols.kit_medical }
            ]
          }
        ]
      });
    }
  }
}