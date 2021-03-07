import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from './../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>()

  recipes: Recipe[] = [
    new Recipe('Test Recipe 1', 'Test Desc about the recipe1', 'https://via.placeholder.com/728x90.png?text=Test+Recipe+1'),
    new Recipe('Test Recipe 2', 'Test Desc about the recipe2', 'https://via.placeholder.com/728x90.png?text=Test+Recipe+2'),
    new Recipe('Test Recipe 3', 'Test Desc about the recipe3', 'https://via.placeholder.com/728x90.png?text=Test+Recipe+3'),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe)
  }

}
