import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RecipesService } from '../core/services/recipes.service';
import { BehaviorSubject, Subject, catchError, concatMap, distinctUntilChanged, exhaustMap, of, switchMap, tap } from 'rxjs';
import { Recipe } from '../core/model/recipe.model';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as recipeTags from '../core/model/tags';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-recipe-creation',
  standalone: true,
  imports: [RadioButtonModule, ButtonModule, FormsModule, ReactiveFormsModule, CommonModule, AutoCompleteModule],
  templateUrl: './recipe-creation.component.html',
})
export class RecipeCreationComponent {

  constructor(private formBuilder: FormBuilder, private service: RecipesService) { }

  recipeForm = this.formBuilder.group<Recipe>({
    id: Math.floor(1000 + Math.random() * 9000),
    title: '',
    ingredients: '',
    tags: '',
    imageUrl: '',
    cookingTime: undefined,
    yield: 0,
    prepTime: undefined,
    steps: '',
  });

  tags = recipeTags.TAGS;
  valueChanges$ = this.recipeForm.valueChanges.pipe(
    concatMap(formValue => this.service.saveRecipe(<Recipe>formValue)),
    catchError(errors => of(errors)),
    tap(result => this.saveSuccess(result))
  );
  saveSuccess(_result: Recipe) {
    console.log('Saved successfully');
  }

  private searchTerms = new BehaviorSubject<string>('');
  tagValues$ = this.searchTerms.pipe(
    //debounceTime(300), // wait 300ms after each keystroke
    distinctUntilChanged(), // ignore if next search term is same as previous
    switchMap((term: string) => this.service.getTags$(term)) // switch to new observable each time
  );

  updateSearchTerm(searchTerm: string) {
    this.searchTerms.next(searchTerm);
  }


  private saveClick = new Subject<Boolean>();
  saveClick$ = this.saveClick.pipe(exhaustMap(() => this.service.saveRecipe(<Recipe>this.recipeForm.value)));
  updateRecipe() {
    this.saveClick.next(true);
  }


}
