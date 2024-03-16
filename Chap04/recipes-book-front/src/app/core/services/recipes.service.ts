import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { environment } from 'src/environments/environment';
import { catchError, of } from 'rxjs';
const BASE_PATH = environment.basePath


@Injectable({
  providedIn: 'root'
})

export class RecipesService {

  recipes$ = this.http.get<Recipe[]>(`${BASE_PATH}/recipes`).pipe(catchError(() => of([])));
  constructor(private http: HttpClient) { }
}
