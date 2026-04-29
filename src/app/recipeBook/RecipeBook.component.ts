import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, map, of, switchMap, forkJoin, Observable } from 'rxjs';

@Component({
    selector: 'app-recipe-book',
    standalone: true,
    templateUrl: './RecipeBook.component.html',
    imports: [FormsModule, CommonModule, HttpClientModule],
})
export class RecipeBookComponent implements OnInit {
    searchTerm: string = 'beef';
    recipes: Recipe[] = [];
    loading = false;
    error: string | null = null;

    private API_BASE = 'https://www.themealdb.com/api/json/v1/1/';

    constructor(private http: HttpClient) { }

    ngOnInit(): void { this.searchRecipes(this.searchTerm); }

    searchRecipes(name: string): void {
        const q = (name || '').trim();
        if (!q) { this.recipes = []; return; }
        this.loading = true;
        this.error = null;

        this.http.get<any>(`${this.API_BASE}search.php?s=${encodeURIComponent(q)}`)
            .pipe(
                switchMap((res: any): Observable<Recipe[]> => {
                    const meals = res?.meals || [];
                    if (meals.length) { return of(meals.map((m: any) => this.transformMeal(m))); }
                    // no name matches: try ingredient filter, then lookup details (limit to first 8)
                    return this.http.get<any>(`${this.API_BASE}filter.php?i=${encodeURIComponent(q)}`)
                        .pipe(
                            switchMap((fres: any): Observable<Recipe[]> => {
                                const filtered = fres?.meals || [];
                                if (!filtered.length) return of([]);
                                const ids = filtered.slice(0, 8).map((m: any) => m.idMeal);
                                const lookups: Observable<any | null>[] = ids.map((id: string) =>
                                    this.http.get<any>(`${this.API_BASE}lookup.php?i=${id}`).pipe(
                                        map(lr => (lr?.meals && lr.meals[0]) || null),
                                        catchError(() => of(null))
                                    )
                                );
                                return forkJoin(lookups).pipe(
                                    map((results: (any | null)[]) => results.filter(Boolean).map((m: any) => this.transformMeal(m)))
                                );
                            })
                        );
                }),
                catchError(err => { this.error = 'Failed to load recipes'; return of([]); })
            )
            .subscribe((list: Recipe[]) => {
                this.recipes = list;
                this.loading = false;
            });
        console.log("Recipes", this.recipes);
    }

    onSearch(): void { this.searchRecipes(this.searchTerm); console.log("searchTerm", this.searchTerm); }

    private transformMeal(m: any): Recipe {
        return {
            id: m.idMeal,
            name: m.strMeal,
            category: m.strCategory,
            area: m.strArea,
            instructions: m.strInstructions,
            thumb: m.strMealThumb,
            youtube: m.strYoutube,
            ingredients: this.buildIngredients(m)
        };
    }

    private buildIngredients(m: any) {
        const items: Ingredient[] = [];
        for (let i = 1; i <= 20; i++) {
            const name = (m[`strIngredient${i}`] || '').trim();
            const measure = (m[`strMeasure${i}`] || '').trim();
            if (name) items.push({ name, measure });
        }
        return items;
    }
}

interface Ingredient { name: string; measure: string }
interface Recipe {
    id: string;
    name: string;
    category?: string;
    area?: string;
    instructions?: string;
    thumb?: string;
    youtube?: string;
    ingredients: Ingredient[];
}