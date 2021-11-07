import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { FirebaseAuthVars } from 'src/environments/environment'

interface AuthResponseData {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private firebase = new FirebaseAuthVars();

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.firebase.getSignUpURL(), {
      email, password, returnSecureToken: true
    }).pipe(catchError(errResp => {
      let errMsg = 'An unknown error occured !!!'
      if (!errResp.error || !errResp.error.error)
        return throwError(errMsg)

      switch (errResp.error.error.message) {
        case 'EMAIL_EXISTS':
          errMsg = 'Email already exists !!!'
          break;
        case 'OPERATION_NOT_ALLOWED':
          errMsg = 'This operations is not allowed !!!'
          break
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errMsg = 'Tried with many attempts !!!'
          break
      }

      return throwError(errMsg)

    }))
  }

}
