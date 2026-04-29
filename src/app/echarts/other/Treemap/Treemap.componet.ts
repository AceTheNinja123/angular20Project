import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent } from 'echarts/components';
import { TreemapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { HttpClient } from '@angular/common/http';

// This is insperation from https://echarts.apache.org/examples/en/editor.html?c=treemap-disk
echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, TreemapChart, CanvasRenderer]);

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './Treemap.component.html',
})
export class TreemapComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const chart = echarts.init(this.chartRef.nativeElement);
      var ROOT_PATH = 'https://echarts.apache.org/examples';

      chart.showLoading();
      this.http.get('assets/data/hobbies.tree.json').subscribe((diskData) => {
        chart.hideLoading();
        const formatUtil = echarts.format;
        function getLevelOption() {
          return [
            { itemStyle: { borderWidth: 0, gapWidth: 5 } },
            { itemStyle: { gapWidth: 1 } },
            { colorSaturation: [0.35, 0.5], itemStyle: { gapWidth: 1, borderColorSaturation: 0.6 } }
          ];
        }
        chart.setOption({
          title: { text: 'Hobbies', left: 'center' },
          tooltip: {
            formatter: function (info: any) {
              var value = info.value;
              var treePathInfo = info.treePathInfo;
              var treePath = [];
              for (var i = 1; i < treePathInfo.length; i++) { treePath.push(treePathInfo[i].name); }
              return [
                '<div class="tooltip-title">' +
                formatUtil.encodeHTML(treePath.join('/')) +
                '</div>',
                'Hobbies: ' + formatUtil.addCommas(value) + ' KB'
              ].join('');
            }
          },
          series: [
            {
              name: 'Hobbies',
              type: 'treemap',
              visibleMin: 300,
              label: { show: true, formatter: '{b}' },
              itemStyle: { borderColor: '#fff' },
              levels: getLevelOption(),
              data: diskData
            }
          ]
        })
      });
    }
  }
}