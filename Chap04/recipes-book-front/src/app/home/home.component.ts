import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from '../recipes-list/recipes-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RecipesListComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {

}
