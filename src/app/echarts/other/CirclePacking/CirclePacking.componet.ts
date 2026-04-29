import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, DatasetComponent } from 'echarts/components';
import { CustomChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';

// This is insperation from https://echarts.apache.org/examples/en/editor.html?c=circle-packing-with-d3
echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, DatasetComponent, CustomChart, CanvasRenderer]);

declare var d3: any;

@Component({
  selector: 'app-circle-packing',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './CirclePacking.component.html',
})
export class CirclePackingComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const chart = echarts.init(this.chartRef.nativeElement);
      const CDN_PATH = 'https://echarts.apache.org/en/js/vendors/d3-hierarchy@2.0.0/dist/d3-hierarchy.min.js';

      const loadScript = (url: string) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = url;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      };

      forkJoin({
        data: this.http.get('/assets/data/toys.json'),
        script: loadScript(CDN_PATH)
      }).subscribe({
        next: (res) => { run(res.data); },
        error: (err) => { console.error('Failed to load data or script for CirclePackingComponent', err); }
      });

      function run(rawData: any) {
        const dataWrap = prepareData(rawData);
        initChart(dataWrap.seriesData, dataWrap.maxDepth);
      }
      function prepareData(rawData: any) {
        const seriesData: any[] = [];
        let maxDepth = 0;
        function convert(source: any, basePath: string, depth: number) {
          if (source == null) { return; }
          if (maxDepth > 5) { return; }
          maxDepth = Math.max(depth, maxDepth);
          seriesData.push({ id: basePath, value: source.$count, depth: depth, index: seriesData.length });
          for (var key in source) {
            if (source.hasOwnProperty(key) && !key.match(/^\$/)) {
              var path = basePath + '.' + key;
              convert(source[key], path, depth + 1);
            }
          }
        }
        convert(rawData, 'option', 0);
        return { seriesData: seriesData, maxDepth: maxDepth };
      }
      function initChart(seriesData: any[], maxDepth: number) {
        var displayRoot = stratify();
        function stratify() {
          return d3
            .stratify()
            .parentId(function (d: any) { return d.id.substring(0, d.id.lastIndexOf('.')); })(seriesData)
            .sum(function (d: any) { return d.value || 0; })
            .sort(function (a: any, b: any) { return b.value - a.value; });
        }
        function overallLayout(params: any, api: any) {
          var context = params.context;
          d3
            .pack()
            .size([api.getWidth() - 2, api.getHeight() - 2])
            .padding(3)(displayRoot);
          context.nodes = {};
          displayRoot.descendants().forEach(function (node: any, index: number) { context.nodes[node.id] = node; });
        }
        function renderItem(params: any, api: any) {
          var context = params.context;
          // Only do that layout once in each time `setOption` called.
          if (!context.layout) {
            context.layout = true;
            overallLayout(params, api);
          }
          var nodePath = api.value('id');
          var node = context.nodes[nodePath];
          if (!node) { return; }
          var isLeaf = !node.children || !node.children.length;
          var focus = new Uint32Array(node.descendants().map(function (node: any) { return node.data.index; }));
          var nodeName = isLeaf
            ? nodePath
              .slice(nodePath.lastIndexOf('.') + 1)
              .split(/(?=[A-Z][^A-Z])/g)
              .join('\n')
            : '';
          var z2 = api.value('depth') * 2;
          return {
            type: 'circle',
            focus: focus,
            shape: { cx: node.x, cy: node.y, r: node.r },
            transition: ['shape'],
            z2: z2,
            textContent: {
              type: 'text',
              style: { text: nodeName, fontFamily: 'Arial', width: node.r * 1.3, overflow: 'truncate', fontSize: node.r / 3 },
              emphasis: { style: { overflow: null, fontSize: Math.max(node.r / 3, 12) } }
            },
            textConfig: { position: 'inside' },
            style: { fill: api.visual('color') },
            emphasis: {
              style: {
                fontFamily: 'Arial',
                fontSize: 12,
                shadowBlur: 20,
                shadowOffsetX: 3,
                shadowOffsetY: 5,
                shadowColor: 'rgba(0,0,0,0.3)'
              }
            }
          };
        }
        chart.setOption({
          title: { text: 'Toy Categories', subtext: 'Click to Drill Down', top: 30, left: 'left' },
          dataset: { source: seriesData },
          tooltip: {
            formatter: (params: any) => {
              const id = params.name || params.data?.id || '';
              const name = id.split('.').pop() || id;
              const value = params.data?.value ?? params.value ?? '';
              return `<b>${name}</b><br/>Count: ${value}`;
            }
          },
          visualMap: [{ show: false, min: 0, max: maxDepth, dimension: 'depth', inRange: { color: ['#006edd', '#e0ffff'] } }],
          hoverLayerThreshold: Infinity,
          series: { type: 'custom', visibleMin: 300, renderItem: renderItem, progressive: 0, coordinateSystem: 'none', encode: { tooltip: 'value', itemName: 'id' } }
        });
        chart.on('click', { seriesIndex: 0 }, function (params) { drillDown(String((params.data as any).id)); });
        function drillDown(targetNodeId: string | null) {
          displayRoot = stratify();
          if (targetNodeId != null) { displayRoot = displayRoot.descendants().find(function (node: any) { return node.data.id === targetNodeId; }); }
          displayRoot.parent = null;
          chart.setOption({ dataset: { source: seriesData } });
        }
        chart.getZr().on('click', function (event) { if (!event.target) { drillDown(null); } });
      }
    }
  }
}