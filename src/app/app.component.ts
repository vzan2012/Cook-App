import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CookApp';

  loadedFeature: string = 'recipe'

  onNavigate(feature: string) {
    this.loadedFeature = feature
  }
}
