import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TitleComponent, TooltipComponent, VisualMapComponent, ToolboxComponent, GeoComponent } from 'echarts/components';
import { MapChart, ScatterChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
//this insporation from https://echarts.apache.org/examples/en/editor.html?c=geo-choropleth-scatter

echarts.use([TitleComponent, TooltipComponent, VisualMapComponent, ToolboxComponent, GeoComponent, MapChart, ScatterChart, CanvasRenderer]);

@Component({
  selector: 'app-choropleth-world-map',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `<div #chartContainer style="height:700px;width:100%"></div>`
})
export class ChoroplethMapComponent implements AfterViewInit {

  @ViewChild('chartContainer') chartRef!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) { }

  ngAfterViewInit() {

    if (!isPlatformBrowser(this.platformId)) return;

    const chart = echarts.init(this.chartRef.nativeElement);
    const colorPalette = ['#F9BC3F', '#8ED395', '#6ACDBB', '#A985D6', '#47C25E', '#40A4BF', '#28956D', '#225981', '#9BD45E', '#2A9D94', '#DF5A46', '#51BBC9', '#CB5034', '#28C89E', '#672644', '#308F90', '#19A4BD', '#87D8DC', '#F0C45F', '#E7804C'];
    const PolygonMapData = [
      { id: "US", name: "United States", value: 500, population: 331, tourists: 79, safety: 75, cursor: "pointer" },
      { id: "CA", name: "Canada", value: 220, population: 38, tourists: 22, safety: 85, cursor: "pointer" },
      { id: "BR", name: "Brazil", value: 180, population: 213, tourists: 6, safety: 55, cursor: "pointer" },
      { id: "MX", name: "Mexico", value: 8, population: 128, tourists: 45, safety: 60, cursor: "pointer" },
      { id: "AR", name: "Argentina", value: 95, population: 45, tourists: 7, safety: 65, cursor: "pointer" },
      { id: "GB", name: "United Kingdom", value: 300, population: 67, tourists: 37, safety: 80, cursor: "pointer" },
      { id: "FR", name: "France", value: 30, population: 65, tourists: 89, safety: 82, cursor: "pointer" },
      { id: "DE", name: "Germany", value: 24, population: 83, tourists: 39, safety: 83, cursor: "pointer" },
      { id: "ES", name: "Spain", value: 210, population: 47, tourists: 84, safety: 78, cursor: "pointer" },
      { id: "IT", name: "Italy", value: 2, population: 59, tourists: 62, safety: 77, cursor: "pointer" },
      { id: "CN", name: "China", value: 400, population: 1412, tourists: 66, safety: 70, cursor: "pointer" },
      { id: "JP", name: "Japan", value: 320, population: 125, tourists: 32, safety: 88, cursor: "pointer" },
      { id: "IN", name: "India", value: 14, population: 1390, tourists: 18, safety: 55, cursor: "pointer" },
      { id: "KR", name: "South Korea", value: 190, population: 52, tourists: 17, safety: 86, cursor: "pointer" },
      { id: "SG", name: "Singapore", value: 85, population: 5.7, tourists: 19, safety: 90, cursor: "pointer" },
      { id: "AU", name: "Australia", value: 2, population: 26, tourists: 9, safety: 87, cursor: "pointer" },
      { id: "NZ", name: "New Zealand", value: 75, population: 5, tourists: 4, safety: 88, cursor: "pointer" },
      { id: "ZA", name: "South Africa", value: 150, population: 59, tourists: 10, safety: 50, cursor: "pointer" },
      { id: "NG", name: "Nigeria", value: 8, population: 206, tourists: 2, safety: 40, cursor: "pointer" },
      { id: "EG", name: "Egypt", value: 30, population: 104, tourists: 13, safety: 58, cursor: "pointer" },
      { id: "RU", name: "Russia", value: 260, population: 145, tourists: 25, safety: 65, cursor: "pointer" },
      { id: "TR", name: "Turkey", value: 170, population: 84, tourists: 51, safety: 66, cursor: "pointer" },
      { id: "SA", name: "Saudi Arabia", value: 140, population: 35, tourists: 20, safety: 72, cursor: "pointer" },
      { id: "AE", name: "United Arab Emirates", value: 3, population: 10, tourists: 22, safety: 85, cursor: "pointer" },
      { id: "IL", name: "Israel", value: 90, population: 9, tourists: 4, safety: 75, cursor: "pointer" },
      { id: "KE", name: "Kenya", value: 60, population: 54, tourists: 2, safety: 55, cursor: "pointer" },
      { id: "DZ", name: "Algeria", value: 55, population: 44, tourists: 3, safety: 52, cursor: "pointer" },
      { id: "MA", name: "Morocco", value: 45, population: 37, tourists: 12, safety: 65, cursor: "pointer" },
      { id: "GH", name: "Ghana", value: 70, population: 31, tourists: 1, safety: 60, cursor: "pointer" },
      { id: "TH", name: "Thailand", value: 110, population: 70, tourists: 40, safety: 72, cursor: "pointer" },
      { id: "VN", name: "Vietnam", value: 65, population: 98, tourists: 18, safety: 70, cursor: "pointer" },
      { id: "PH", name: "Philippines", value: 130, population: 113, tourists: 8, safety: 62, cursor: "pointer" },
      { id: "PK", name: "Pakistan", value: 85, population: 231, tourists: 1, safety: 48, cursor: "pointer" },
      { id: "NL", name: "Netherlands", value: 125, population: 17, tourists: 20, safety: 87, cursor: "pointer" },
      { id: "SE", name: "Sweden", value: 50, population: 10, tourists: 7, safety: 90, cursor: "pointer" },
      { id: "NO", name: "Norway", value: 40, population: 5, tourists: 6, safety: 92, cursor: "pointer" },
      { id: "PL", name: "Poland", value: 95, population: 38, tourists: 19, safety: 80, cursor: "pointer" },
      { id: "CL", name: "Chile", value: 70, population: 19, tourists: 6, safety: 75, cursor: "pointer" },
      { id: "CO", name: "Colombia", value: 100, population: 51, tourists: 5, safety: 55, cursor: "pointer" },
      { id: "PE", name: "Peru", value: 65, population: 33, tourists: 4, safety: 65, cursor: "pointer" },
      { id: "VE", name: "Venezuela", value: 30, population: 28, tourists: 1, safety: 35, cursor: "pointer" },
      { id: "IQ", name: "Iraq", value: 40, population: 42, tourists: 2, safety: 40, cursor: "pointer" },
      { id: "IR", name: "Iran", value: 120, population: 85, tourists: 5, safety: 50, cursor: "pointer" },
      { id: "QA", name: "Qatar", value: 25, population: 3, tourists: 2, safety: 85, cursor: "pointer" },
      { id: "KW", name: "Kuwait", value: 35, population: 4, tourists: 1, safety: 78, cursor: "pointer" },
      { id: "FJ", name: "Fiji", value: 20, population: 1, tourists: 0.9, safety: 80, cursor: "pointer" },
      { id: "PG", name: "Papua New Guinea", value: 18, population: 9, tourists: 0.2, safety: 45, cursor: "pointer" }
    ];

    chart.showLoading();

    this.http.get('/assets/maps/world.json').subscribe({
      next: (geoJSON: any) => {
        echarts.registerMap('world', geoJSON);
        chart.hideLoading();

        chart.setOption({
          title: { text: 'World Data Distribution', subtext: 'Choropleth Map with Ranges', left: 'center' },
          tooltip: {
            trigger: 'item',
            formatter: (params: any) => {
              const data = params.data;
              if (!data) return params.name;

              return `
                <b>${data.name}</b><br/>
                Value: ${data.value}<br/>
                Population: ${data.population}M<br/>
                Tourists: ${data.tourists}M<br/>
                Safety: ${data.safety}
              `;
            }
          },
          geo: {
            map: 'world',
            roam: true,
            itemStyle: { borderColor: '#a2a9b1' },
            emphasis: { itemStyle: { areaColor: '#b1b1b1' } }
          },
          visualMap: {
            type: 'piecewise',
            orient: 'vertical',
            left: 20,
            bottom: 20,
            pieces: [
              { max: 3, label: '< 3', color: colorPalette[0] },
              { min: 3, max: 10, label: '3 - 10', color: colorPalette[1] },
              { min: 10, max: 25, label: '10 - 25', color: colorPalette[2] },
              { min: 25, max: 50, label: '25 - 50', color: colorPalette[3] },
              { min: 50, max: 100, label: '50 - 100', color: colorPalette[4] },
              { min: 100, max: 300, label: '100 - 300', color: colorPalette[5] },
              { min: 300, label: '> 300', color: colorPalette[6] }
            ]
          },
          series: [
            {
              name: 'Country Value',
              type: 'map',
              map: 'world',
              geoIndex: 0,
              data: PolygonMapData.map(d => ({
                name: d.name, 
                value: d.value,
                population: d.population,
                tourists: d.tourists,
                safety: d.safety
              }))
            }
          ]

        });
      },
      error: (err) => {
        console.error('Map failed to load:', err);
        chart.hideLoading();
      }
    });

  }
}