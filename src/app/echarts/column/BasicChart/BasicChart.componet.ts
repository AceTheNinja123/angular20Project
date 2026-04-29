import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TitleComponent, TooltipComponent, GridComponent, DataZoomComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
// This is insperation from https://echarts.apache.org/examples/en/editor.html?c=area-stack-gradient&theme=dark
echarts.use([TitleComponent, TooltipComponent, GridComponent, DataZoomComponent, BarChart, CanvasRenderer]);

@Component({
  selector: 'app-basic-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './BasicChart.component.html',
})
export class BasicChartComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const chart = echarts.init(this.chartRef.nativeElement);

      chart.setOption({
        title: { text: 'Movie Genre Popularity', subtext: 'Bar Chart Example', left: 'center' },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: {
          type: 'category',
          data: ['Action', 'Drama', 'Comedy', 'Horror', 'Romance', 'Sci-Fi', 'Documentary', 'Fantasy', 'Thriller', 'Animation'],
          axisLabel: { interval: 0, rotate: 45 }
        },
        yAxis: { type: 'value' },
        series: [{
          colorBy: 'data', type: 'bar',
          data: [
            { category: "Action", value: 25, name: "Explosive Action" },
            { category: "Drama", value: 50, name: "Emotional Story" },
            { category: "Comedy", value: 80, name: "Funny Moments" },
            { category: "Horror", value: 30, name: "Scary Tales" },
            { category: "Romance", value: 55, name: "Love Stories" },
            { category: "Sci-Fi", value: 90, name: "Futuristic Worlds" },
            { category: "Documentary", value: 20, name: "Real Stories" },
            { category: "Fantasy", value: 60, name: "Magical Worlds" },
            { category: "Thriller", value: 85, name: "Edge of Seat" },
            { category: "Animation", value: 45, name: "Family Fun" }
          ],
        }]
      });
    }
  }
}