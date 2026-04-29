import { Component } from '@angular/core';
import { WeatherAppComponent } from '../weatherApp/WeatherApp.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-app-page',
  standalone: true,
  imports: [WeatherAppComponent, CommonModule],
  template: `<app-weather-app></app-weather-app> `,
  styles: ``,
})
export class WeatherAppPage { }
