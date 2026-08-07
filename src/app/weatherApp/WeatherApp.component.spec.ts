// weather-app.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { WeatherAppComponent } from './WeatherApp.component';

describe('WeatherAppComponent', () => {
    let component: WeatherAppComponent;
    let fixture: ComponentFixture<WeatherAppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WeatherAppComponent],
            providers: [
                {
                    provide: HttpClient,
                    useValue: {
                        get: () =>
                            of({
                                name: 'Pune',
                                main: { temp: 28, humidity: 60 },
                                weather: [{ description: 'clear sky', icon: '01d' }],
                                wind: { speed: 3.2 },
                            }),
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(WeatherAppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});