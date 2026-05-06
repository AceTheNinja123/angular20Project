import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding, Route } from '@angular/router';
import { GridDemo } from './grid-demo/grid-demo';
import { WeatherAppPage } from './weatherAppPage/WeatherAppPage';
import { MovieSearchComponent } from './movieSearch/MovieSearch.component';
import { ExpenseListComponent } from './expenseTracker/expense-list/expense-list.component';
import { CalendarComponent } from './eventCalender/calendar/calendar.component';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { QuizComponent } from './quiz/quiz.component';
import { ChessComponent } from './chess/Chess.component';
import { TetrisGamePage } from './tentrisGamePage/TetrisGamePage.component';
import { RecipeBookComponent } from './recipeBook/RecipeBook.component';
import { MusicSearchComponent } from './musicSearch/MusicSearch.component';
// ECharts components
import { MapEcharts } from './echarts/map/MapEcharts.component';
import { PieEcharts } from './echarts/pie/PieEcharts.component';
import { OtherEcharts } from './echarts/other/OtherEcharts.component';
import { PolarBarEcharts } from './echarts/polarBar/PolarBarEcharts.component';
import { LineEcharts } from './echarts/line/LineEcharts.component';
import { ColumnEcharts } from './echarts/column/ColumnEcharts.component';
import { GroupEcharts } from './echarts/group/GroupEcharts.component';

const appRoutes: Route[] = [
  { path: '', redirectTo: 'grid-demo', pathMatch: 'full' },
  { path: 'grid-demo', component: GridDemo },
  { path: 'weather-app', component: WeatherAppPage },
  { path: 'movie-search', component: MovieSearchComponent },
  { path: 'expense-tracker', component: ExpenseListComponent },
  { path: 'event-calender', component: CalendarComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'chess', component: ChessComponent },
  { path: 'tetris', component: TetrisGamePage },
  { path: 'recipe-book', component: RecipeBookComponent },
  { path: 'echarts/map', component: MapEcharts },
  { path: 'echarts/pie', component: PieEcharts },
  { path: 'echarts/other', component: OtherEcharts },
  { path: 'echarts/polar-bar', component: PolarBarEcharts },
  { path: 'echarts/line', component: LineEcharts },
  { path: 'echarts/column', component: ColumnEcharts },
  { path: 'echarts/group', component: GroupEcharts },
  { path: 'music-search', component: MusicSearchComponent },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideAnimationsAsync(),
    provideClientHydration(withEventReplay()),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),]
};
