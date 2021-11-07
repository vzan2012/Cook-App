// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const recipesDB_URL = 'https://ng-cook-recipes-206f7-default-rtdb.firebaseio.com/recipes.json';

export class FirebaseAuthVars {
  private FIREBASE_WEB_KEY: string = '';

  getFirebaseWebKey() {
    return this.FIREBASE_WEB_KEY
  }

  getSignUpURL() {
    return `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.FIREBASE_WEB_KEY}`
  }

  getSignINURL() {
    return `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.FIREBASE_WEB_KEY}`
  }
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
