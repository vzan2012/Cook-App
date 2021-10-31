import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  fetchRecipeSubscription!: Subscription;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.fetchRecipeSubscription = this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.fetchRecipeSubscription.unsubscribe();
  }

}
