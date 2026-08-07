import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding, Route } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

const appRoutes: Route[] = [
  { path: '', redirectTo: 'grid-demo', pathMatch: 'full' },
  { path: 'grid-demo', loadComponent: () => import('./grid-demo/grid-demo').then((m) => m.GridDemo) },
  { path: 'weather-app', loadComponent: () => import('./weatherAppPage/WeatherAppPage').then((m) => m.WeatherAppPage) },
  { path: 'movie-search', loadComponent: () => import('./movieSearch/MovieSearch.component').then((m) => m.MovieSearchComponent) },
  { path: 'expense-tracker', loadComponent: () => import('./expenseTracker/expense-list/expense-list.component').then((m) => m.ExpenseListComponent) },
  { path: 'event-calender', loadComponent: () => import('./eventCalender/calendar/calendar.component').then((m) => m.CalendarComponent) },
  { path: 'quiz', loadComponent: () => import('./quiz/quiz.component').then((m) => m.QuizComponent) },
  { path: 'chess', loadComponent: () => import('./chess/Chess.component').then((m) => m.ChessComponent) },
  { path: 'tetris', loadComponent: () => import('./tentrisGamePage/TetrisGamePage.component').then((m) => m.TetrisGamePage) },
  { path: 'magic-game', loadComponent: () => import('./theMagicGame/TheMagicGame.component').then((m) => m.TheMagicGameComponent) },
  { path: 'recipe-book', loadComponent: () => import('./recipeBook/RecipeBook.component').then((m) => m.RecipeBookComponent) },
  { path: 'echarts/map', loadComponent: () => import('./echarts/map/MapEcharts.component').then((m) => m.MapEcharts) },
  { path: 'echarts/pie', loadComponent: () => import('./echarts/pie/PieEcharts.component').then((m) => m.PieEcharts) },
  { path: 'echarts/other', loadComponent: () => import('./echarts/other/OtherEcharts.component').then((m) => m.OtherEcharts) },
  { path: 'echarts/polar-bar', loadComponent: () => import('./echarts/polarBar/PolarBarEcharts.component').then((m) => m.PolarBarEcharts) },
  { path: 'echarts/line', loadComponent: () => import('./echarts/line/LineEcharts.component').then((m) => m.LineEcharts) },
  { path: 'echarts/column', loadComponent: () => import('./echarts/column/ColumnEcharts.component').then((m) => m.ColumnEcharts) },
  { path: 'echarts/group', loadComponent: () => import('./echarts/group/GroupEcharts.component').then((m) => m.GroupEcharts) },
  { path: 'music-search', loadComponent: () => import('./musicSearch/MusicSearch.component').then((m) => m.MusicSearchComponent) },
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
