import { Component } from '@angular/core';
import { SharedDataService } from '../core/services/shared-data.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-details.component.html',
})
export class RecipeDetailsComponent {

  constructor(private sharedService: SharedDataService) { } 
  // selectedRecipe = this.sharedService.selectedRecipe; 
  selectedRecipe = toSignal(this.sharedService.recipe$); 

}
