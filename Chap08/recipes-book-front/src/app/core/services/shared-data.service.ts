import { Injectable, signal } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const BASE_PATH = environment.basePath

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  selectedRecipe = signal({} as Recipe);
  selectedRecipeId = signal<number | undefined>(undefined);
  recipe$ = toObservable(this.selectedRecipeId).pipe(filter(Boolean), switchMap(id =>
    this.http.get<Recipe>(`${BASE_PATH}/recipes/${id}`)
  ));

  // updateSelectedRecipe(recipe: Recipe) {
  //   this.selectedRecipe.set(recipe); 
  // }

  updateSelectedRecipe(recipeId: number | undefined) {
    this.selectedRecipeId.set(recipeId);
  }

  constructor(private http: HttpClient) {

  }
}
