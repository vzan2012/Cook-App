import { Component, OnInit } from '@angular/core';

import { Ingredient } from './../shared/ingredient.model'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient('Garlic', 5),
    new Ingredient('Pepper', 5)
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
