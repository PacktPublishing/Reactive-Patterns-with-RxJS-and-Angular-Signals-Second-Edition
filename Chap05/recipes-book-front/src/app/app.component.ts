import { Component, signal } from '@angular/core';
import { Recipe } from './core/model/recipe.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'recipes-book-front';
  name = signal('John Doe');
  favouriteRecipe = signal<Recipe>({
    id: 1,
    title: "Lemon cake",
    prepTime: 10,
    cookingTime: 35,
    yield: 10,
    imageUrl: "lemon-cake.jpg"
  })

  currencies = signal([{ name: 'EURO', id: 1 }, { name: 'DOLLAR', id: 2 }, { name: 'Japanese yen', id: 3 }, { name: 'Sterling', id: 4 }])

  constructor() {
    console.log(this.name());
    this.name.set('Mary Dick');
    console.log(this.name());
    console.log(this.favouriteRecipe());
  }

  trackCurrency(index: number, product: any) {
    return product ? product.id : undefined;
  }
}
