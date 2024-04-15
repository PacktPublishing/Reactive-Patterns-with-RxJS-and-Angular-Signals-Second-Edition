import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject, from, mergeMap, of } from 'rxjs';
const BASE_PATH = environment.basePath;
import { Tag } from '../model/tags';
// import { Review } from '../model/review.model';


@Injectable({
  providedIn: 'root'
})

export class RecipesService {

  // tags = recipeTags.TAGS;

  recipes$ = this.http.get<Recipe[]>(`${BASE_PATH}/recipes`);
  private filterRecipeSubject = new BehaviorSubject<Recipe>({ title: '' });
  filterRecipesAction$ = this.filterRecipeSubject.asObservable();
  private selectedTags = new BehaviorSubject<string>('');
  selectedTags$ = this.selectedTags.asObservable();

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


  // getRecipesReviews(recipeId: number): Observable<Review[]> {
  //   return from([`${BASE_PATH}/source1/reviews`, `${BASE_PATH}/source2/reviews`])
  //     .pipe(
  //       mergeMap((endpoint) => this.http.get<Review[]>(endpoint, { params: { recipeId: recipeId } })));
  // }

}
