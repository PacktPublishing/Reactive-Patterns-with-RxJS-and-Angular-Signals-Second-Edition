import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RecipesService } from './recipes.service';
import { Recipe } from '../model/recipe.model';

describe('RecipesService', () => {

  let service: RecipesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecipesService]
    });
    httpTestingController = TestBed.inject(HttpTestingController)
    service = TestBed.inject(RecipesService)
  });


  it('should save recipe from API', () => {
    const recipeToSave : Recipe= {
      "id": 9,
      "title": "Lemon cake",
      "prepTime": 10,
      "cookingTime": 35,
      "rating": 3,
      "imageUrl": "lemon-cake.jpg"

    }
    const subscription = service.saveRecipe(recipeToSave)
      .subscribe(_recipe => {
        expect(recipeToSave).toEqual(_recipe, 'should check mock data')
      });
    const req = httpTestingController.expectOne(`/api/recipes`);
    req.flush(recipeToSave);
    subscription.unsubscribe();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});