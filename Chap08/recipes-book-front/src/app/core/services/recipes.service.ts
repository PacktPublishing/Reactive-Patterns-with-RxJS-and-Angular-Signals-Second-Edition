import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable} from 'rxjs';
const BASE_PATH = environment.basePath;
import { Tag } from '../model/tags';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})

export class RecipesService {

  recipes$ = this.http.get<Recipe[]>(`${BASE_PATH}/recipes`);
  recipes = toSignal(this.recipes$, { initialValue: [] as Recipe[], rejectErrors:true });
  filterRecipe = signal({ title: '' } as Recipe);

  private selectedTags = new BehaviorSubject<string>('');
  selectedTags$ = this.selectedTags.asObservable();


  constructor(private http: HttpClient) { }

  updateFilter(criteria: Recipe) {
    this.filterRecipe.set(criteria);
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