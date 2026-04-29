import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { GraphChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
//this insporation from https://echarts.apache.org/examples/en/editor.html?c=graph-circular-layout
echarts.use([TitleComponent, TooltipComponent, GraphChart, CanvasRenderer, LegendComponent]);

@Component({
  selector: 'app-lesmiserables',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `<div #chartContainer style="height:700px;width:100%"></div>`
})
export class LesMiserablesComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) { }

  ngAfterViewInit() {

    if (!isPlatformBrowser(this.platformId)) return;

    const chart = echarts.init(this.chartRef.nativeElement);
    const graph = {
      categories: [{ name: 'Hotels' }, { name: 'Guests' }, { name: 'Staff' }],
      nodes: [{ name: 'Hotel A', category: 0, symbolSize: 50 }, { name: 'Hotel B', category: 0, symbolSize: 40 }, { name: 'Alice', category: 1, symbolSize: 30 }, { name: 'Eve', category: 1, symbolSize: 35 }, { name: 'Bob', category: 1, symbolSize: 25 }, { name: 'Manager', category: 2, symbolSize: 35 }, { name: 'Reception', category: 2, symbolSize: 28 }],
      links: [{ source: 'Alice', target: 'Hotel A' }, { source: 'Bob', target: 'Hotel B' }, { source: 'Eve', target: 'Hotel A' }, { source: 'Manager', target: 'Hotel A' }, { source: 'Reception', target: 'Hotel B' }]
    };
    chart.showLoading();

    // Simulate async data loading
    setTimeout(() => {
      chart.hideLoading();
      graph.nodes.forEach(function (node: any) { node.label = { show: true }; });
      chart.setOption({
        title: { top: 30, text: 'Hotel Network', subtext: 'Guests, Staff & Hotels', left: 'right' },
        tooltip: {},
        legend: [{ orient: 'vertical', left: 'left', top: 'center', data: graph.categories.map((c: any) => c.name) }],
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: 'Hotel Graph',
            type: 'graph',
            left: '15%',
            right: '15%',
            top: '15%',
            bottom: '15%',
            layout: 'circular',
            circular: { rotateLabel: true },
            data: graph.nodes,
            links: graph.links,
            categories: graph.categories,
            roam: true,
            label: { position: 'right', formatter: '{b}' },
            lineStyle: { color: 'source', curveness: 0.3 }
          },
        ]
      });
    }, 1000);
  }
}