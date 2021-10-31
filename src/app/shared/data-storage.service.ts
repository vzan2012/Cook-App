import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';

import { recipesDB_URL } from 'src/environments/environment';
import { Recipe } from '../recipes/recipe.model';

import { map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  recipes_DB_URL: string = recipesDB_URL;

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.recipes_DB_URL, recipes).subscribe(response => console.log(response))
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(recipesDB_URL).pipe(
      map(recipes => recipes.map(recipe => {
        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
      })),
      tap(recipes => {
        this.recipeService.setRecipes(recipes)
      })
    )
  }
}
