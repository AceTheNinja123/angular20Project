import { Component, signal } from '@angular/core';
import { JokesService } from './jokes.services';
import { CommonModule } from '@angular/common';

// this took inspiration from https://www.geeksforgeeks.org/angular-js/dad-joke-generator-using-angular/

@Component({
    selector: 'app-joke-generator',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './JokeGenerator.component.html',
    styleUrl: '../../../styles.css'
})
export class JokeGenerator {
    title = 'jokes';
    joke = signal("");
    loading = signal(false);
    error = signal('');
    constructor(private jokesService: JokesService) { }
    getJokes() {
        this.loading.set(true);
        this.jokesService.get().subscribe({
            next: (response: any) => {
                this.joke.set(response.joke);
                this.loading.set(false);
            },
            error: (error: any) => {
                this.error.set(error.message);
                this.loading.set(false);
            }
        });
    }
}