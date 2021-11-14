import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';

import { recipesDB_URL } from 'src/environments/environment';
import { Recipe } from '../recipes/recipe.model';

import { exhaustMap, map, take, tap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  recipes_DB_URL: string = recipesDB_URL;

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.recipes_DB_URL, recipes).subscribe(response => console.log(response))
  }

  fetchRecipes() {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http.get<Recipe[]>(recipesDB_URL, {
        params: new HttpParams().set('auth', user.token)
      });
    }), map(recipes => recipes.map(recipe => {
      return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
    })),
      tap(recipes => {
        this.recipeService.setRecipes(recipes)
      }));

  }
}
