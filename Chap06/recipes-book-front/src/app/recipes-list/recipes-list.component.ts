import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesService } from '../core/services/recipes.service';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { combineLatest, concatAll, from, map, mergeMap } from 'rxjs';
import { Recipe } from '../core/model/recipe.model';
import { TagsListComponent } from '../tags-list/tags-list.component';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [CommonModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    RatingModule, FormsModule,
    TagsListComponent
  ],
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class RecipesListComponent {
  recipes$ = this.service.recipes$;
  recipes: Recipe[] = [];
  /* The readonly stream */
  filterRecipesAction$ = this.service.filterRecipesAction$;
  filtredRecipes$ = combineLatest([this.recipes$, this.filterRecipesAction$]).pipe(
    map(([recipes, filter]: [Recipe[], Recipe]) => {
      const filterTitle = filter?.title?.toLowerCase() ?? '';
      return recipes.filter(recipe => recipe.title?.toLowerCase()
        .includes(filterTitle))
    })
  );

  recipesByTag$ = this.service.selectedTags$.pipe(mergeMap(tagName => this.service.getRecipesByTag(tagName))).pipe(
    map(result => this.recipes = [...this.recipes, ...result]));

  constructor(private service: RecipesService) {
    this.service.getRecipesReviews(0).subscribe();
  }

}
