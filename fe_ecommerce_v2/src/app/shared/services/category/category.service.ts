import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategory(): Observable<string[]> {
    return this.http.get<any[]>('http://localhost:8080/categories').pipe(
      map((categories: any[]) => {
        return categories.map((category) => category.category_name);
      })
    );
  }
}
