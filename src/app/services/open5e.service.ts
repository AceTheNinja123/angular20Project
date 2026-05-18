import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassInfo, RaceInfo, BackgroundInfo } from '@app/grid-demo/dndCharacterGenerator/DndInterface';
export interface Open5eList<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Open5eClass {
  name: string;
  slug: string;
  subspecies_of?: string | null;
  subclass_of?: string | object | null;
  key?: string;
  // add other fields as needed
}

@Injectable({ providedIn: 'root' })
export class Open5eService {
  private base = 'https://api.open5e.com/v2';

  constructor(private http: HttpClient) { }

  getClasses(page = 1): Observable<Open5eList<Open5eClass>> {
    return this.http.get<Open5eList<Open5eClass>>(`${this.base}/classes/?page=${page}`);
  }

  getClass(slug: string) {
    return this.http.get<ClassInfo>(`${this.base}/classes/${slug}`);
  }

  getRaces(page = 1): Observable<Open5eList<Open5eClass>> {
    return this.http.get<Open5eList<Open5eClass>>(`${this.base}/species/?page=${page}`);
  }

  getRace(slug: string) {
    return this.http.get<RaceInfo>(`${this.base}/species/${slug}`);
  }

  getBackgrounds(page = 1): Observable<Open5eList<Open5eClass>> {
    return this.http.get<Open5eList<Open5eClass>>(`${this.base}/backgrounds/`);
  }

  getBackground(slug: string) {
    return this.http.get<BackgroundInfo>(`${this.base}/backgrounds/${slug}`);
  }
}