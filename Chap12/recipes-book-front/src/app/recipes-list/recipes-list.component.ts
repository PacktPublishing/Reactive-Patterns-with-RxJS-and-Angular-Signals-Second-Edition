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
import { combineLatest,map } from 'rxjs';
import { Recipe } from '../core/model/recipe.model';
import { TagsListComponent } from '../tags-list/tags-list.component';
import { SharedDataService } from '../core/services/shared-data.service';
import { Router } from '@angular/router';
import { RealTimeService } from '../core/services/real-time.service';


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
    // recipes$=combineLatest([this.service.recipes$, this.realTimeService.messages$]).pipe(map(([recipes, updatedRecipes]) => { 
  //   // Merge or concatenate the two arrays into a single array 
  //   return [...recipes, ...updatedRecipes]; 

  // })); 
  // recipes$ = combineLatest([
  //   this.service.recipes$,
  //   this.realTimeService.messages$
  // ]).pipe(
  //   scan((acc: Recipe[], [recipes, updatedRecipes]: [Recipe[], Recipe[]]) => {
  //     // Merge or concatenate the two arrays into a single array
  //     return acc.length === 0 && updatedRecipes.length === 0 ? recipes : [...acc, ...updatedRecipes,];
  //   }, [])
  // );
  /* The readonly stream */
  filterRecipesAction$ = this.service.filterRecipesAction$;
  filteredRecipes$ = combineLatest([this.recipes$, this.filterRecipesAction$]).pipe(
    map(([recipes, filter]: [Recipe[], Recipe]) => {
      const filterTitle = filter?.title?.toLowerCase() ?? '';
      return recipes.filter(recipe => recipe.title?.toLowerCase()
        .includes(filterTitle))
    })
  );

  constructor(private service: RecipesService, private sharedService: SharedDataService, private router: Router, private realTimeService: RealTimeService) {
  }

  editRecipe(recipe: Recipe) {
    this.sharedService.updateSelectedRecipe(recipe); 
    this.router.navigate(['/recipes/details']); 
 } 
}
