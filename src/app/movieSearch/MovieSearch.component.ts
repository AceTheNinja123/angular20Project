import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// This took inspiration from https://www.geeksforgeeks.org/angular-js/movie-app-using-angular/

@Component({
    selector: 'app-movie-search',
    standalone: true,
    templateUrl: './MovieSearch.component.html',
    imports: [FormsModule, CommonModule],
})
export class MovieSearchComponent {
    searchTerm: string = '';
    movies: any[] = [];

    private API_URL = 'https://omdbapi.com/?apikey=fe2f6c44';

    constructor(private http: HttpClient) { this.searchMovies('SpiderMan'); }

    searchMovies(title: string): void { this.http.get<any>(`${this.API_URL}&s=${title}`).subscribe(response => { this.movies = response.Search || []; }); }

    onSearch(): void { if (this.searchTerm.trim()) { this.searchMovies(this.searchTerm); } }
}