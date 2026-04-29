// jokes.services.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JokesService {
    url = "https://icanhazdadjoke.com/";
    constructor(private http: HttpClient) { }
    get(): Observable<any> { return this.http.get<any>(this.url, { headers: { 'Accept': 'application/json' } }); }
}