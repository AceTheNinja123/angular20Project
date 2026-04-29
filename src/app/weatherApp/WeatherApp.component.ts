import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// this took insporation from https://www.geeksforgeeks.org/angular-js/weather-app-using-angular/
@Component({
  selector: 'app-weather-app',
  standalone: true,
  templateUrl: './WeatherApp.component.html',
  styleUrls: ['./WeatherApp.component.css'],
  imports: [FormsModule, CommonModule],
})
export class WeatherAppComponent implements OnInit {
  cityName = 'Pune';

  weatherData = signal<any | null>(null);
  loading = signal(false);
  error = signal('');

  iconUrl = '';
  currentDate = '';

  private url = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

  constructor(private http: HttpClient) { }

  ngOnInit(): void { this.getWeather(); }

  getWeather(): void {
    if (!this.cityName.trim()) {
      this.error.set('Please provide a city name.');
      this.weatherData.set(null);
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.weatherData.set(null);

    const fullUrl = `${this.url}?q=${this.cityName.trim()}&appid=${this.apiKey}&units=metric`;

    this.http.get(fullUrl).subscribe({
      next: (data: any) => {
        this.weatherData.set(data);
        this.iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        this.currentDate = new Date().toLocaleString();
        this.loading.set(false);
      },
      error: () => {
        this.error.set('City not found. Please try again.');
        this.loading.set(false);
        this.weatherData.set(null);
      },
    });
  }
}