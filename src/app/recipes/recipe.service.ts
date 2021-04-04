import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private shoppingListService: ShoppingListService) { }

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Vegan Pizza Margherita', 'Classic flavours of this Italian comfort food using plant-based substitutes', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/vegan-pizza-67125d6.jpg', [new Ingredient('Pizza Dough', 1), new Ingredient('Tomato Sauce', 1), new Ingredient('Fresh Basil (Oregano leaves)', 1)]),
    new Recipe('Creamy Vegan Avocado Salad', 'Creamy, satisfying, and refreshing', 'http://zardyplants.com/wp-content/uploads/2020/06/Vegan-Avocado-Salad-3.jpg', [new Ingredient('Avocado', 1), new Ingredient('Baby Spinach', 3), new Ingredient('Tomato', 1), new Ingredient('Cucumber', 1)]),
    new Recipe('Grape Juice', 'Easy to make this sweet drink', 'https://www.cookforyourlife.org/wp-content/uploads/2018/08/Fresh-Grape-Juice.jpg', [new Ingredient('Grapes', 3), new Ingredient('Lemon', 1)]),
  ];

  getRecipes() {
    return this.recipes.slice()
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients)
  }

}
