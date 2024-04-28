import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
const BASE_PATH = environment.basePath;
import { Tag } from '../model/tags';


@Injectable({
  providedIn: 'root'
})

export class RecipesService {


  recipes$ = this.http.get<Recipe[]>(`${BASE_PATH}/recipes`);
  private filterRecipeSubject = new BehaviorSubject<Recipe>({ title: '' });
  filterRecipesAction$ = this.filterRecipeSubject.asObservable();
  private selectedTags = new BehaviorSubject<string>('');
  selectedTags$ = this.selectedTags.asObservable();
  getTags$: (term: string) => Observable<Tag[]> = (term: string) => {
    return this.http.get<Tag[]>(`${BASE_PATH}/tags`, { params: { criteria: term } });
  };

  constructor(private http: HttpClient) { }

  updateFilter(criteria: Recipe) {
    this.filterRecipeSubject.next(criteria);
  }

  updateSelectedTag(tag: string) {
    this.selectedTags.next(tag);
  }

  saveRecipe(formValue: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${BASE_PATH}/recipes/save`, formValue);
  }

  searchTags(term: string): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${BASE_PATH}/tags`, { params: { criteria: term } });
  }

  getRecipesByTag(name: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${BASE_PATH}/recipesByTags/`, { params: { tagName: name } });
  }

}
