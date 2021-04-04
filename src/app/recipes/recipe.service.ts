import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Test Recipe 1', 'Test Desc about the recipe1', 'https://via.placeholder.com/728x90.png?text=Test+Recipe+1'),
    new Recipe('Test Recipe 2', 'Test Desc about the recipe2', 'https://via.placeholder.com/728x90.png?text=Test+Recipe+2'),
    new Recipe('Test Recipe 3', 'Test Desc about the recipe3', 'https://via.placeholder.com/728x90.png?text=Test+Recipe+3'),
  ];

  getRecipes() {
    return this.recipes.slice()
  }

}
