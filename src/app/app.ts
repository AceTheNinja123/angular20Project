import { RouterModule } from '@angular/router';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MatMenuModule, MatButtonModule, MatIconModule, MatDividerModule],
  template: `
    <nav>
      <a routerLink="/grid-demo" routerLinkActive="active" class="navBlock">Grid Demo</a>
      <a routerLink="/weather-app" routerLinkActive="active" class="navBlock">Weather App</a>
      <a routerLink="/movie-search" routerLinkActive="active" class="navBlock">Movie Search</a>
      <a routerLink="/music-search" routerLinkActive="active" class="navBlock">Music Search</a>
      <a routerLink="/expense-tracker" routerLinkActive="active" class="navBlock">Expense Tracker</a>
      <a routerLink="/event-calender" routerLinkActive="active" class="navBlock">Event Calendar</a>
      <a routerLink="/quiz" routerLinkActive="active" class="navBlock">Quiz</a>
      <a routerLink="/chess" routerLinkActive="active" class="navBlock">Chess</a>
      <a routerLink="/tetris" routerLinkActive="active" class="navBlock">Tetris</a>
      <a routerLink="/magic-game" routerLinkActive="active" class="navBlock">Magic Game</a>
      <a routerLink="/recipe-book" routerLinkActive="active" class="navBlock">Recipe Book</a>
      <button mat-button [matMenuTriggerFor]="echartsMenu" class="navDropdown" style="color: {{ titleColor }} !important;">
        {{chartTitle}} ▼
      </button>
      <mat-menu #echartsMenu="matMenu" class="navMenu">
        <a mat-menu-item *ngFor="let chart of charts" [routerLink]="chart.path" routerLinkActive="active-menu-item">
          <mat-icon>{{ chart.icon }}</mat-icon>
          <span>{{ chart.label }}</span>
        </a>
      </mat-menu>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class App {
  public chartTitle = "Echarts";
  private router = inject(Router);
  public titleColor = '';
  private routeMap: Record<string, string> = {
    '/echarts/column': 'Column Chart',
    '/echarts/group': 'Group Chart',
    '/echarts/line': 'Line Chart',
    '/echarts/map': 'Map Chart',
    '/echarts/other': 'Other Chart',
    '/echarts/pie': 'Pie Chart',
    '/echarts/polar-bar': 'Polar Bar Chart',
  };

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateTitleFromRoute();
      });

    this.updateTitleFromRoute();
  }
  public charts = [
    { path: '/echarts/column', label: 'Column Chart', icon: 'bar_chart' },
    { path: '/echarts/group', label: 'Group Chart', icon: 'stacked_bar_chart' },
    { path: '/echarts/line', label: 'Line Chart', icon: 'show_chart' },
    { path: '/echarts/map', label: 'Map Chart', icon: 'map' },
    { path: '/echarts/other', label: 'Other Chart', icon: 'more_horiz' },
    { path: '/echarts/pie', label: 'Pie Chart', icon: 'pie_chart' },
    { path: '/echarts/polar-bar', label: 'Polar Bar Chart', icon: 'donut_large' },
  ];
  private updateTitleFromRoute(): void {
    const match = this.charts.find(c => c.path === this.router.url);
    this.chartTitle = match?.label || 'Echarts';
    if (this.chartTitle == match?.label) { this.titleColor = 'white'; } else { this.titleColor = ''; }
  }
}
