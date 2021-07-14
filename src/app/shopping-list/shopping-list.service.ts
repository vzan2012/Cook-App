import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor() { }

  startEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Garlic', 5),
    new Ingredient('Pepper', 5)
  ]

  ingredientChanged = new Subject<Ingredient[]>();

  getIngredient(index: number) {
    return this.ingredients[index]
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
    this.ingredientChanged.next(this.ingredients.slice())
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice())
  }

}
