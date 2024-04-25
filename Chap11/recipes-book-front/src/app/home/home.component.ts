import { Component } from '@angular/core';

import { RecipesListComponent } from '../recipes-list/recipes-list.component';
import { RecipesFilterComponent } from '../recipes-filter/recipes-filter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecipesListComponent, RecipesFilterComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {

}
