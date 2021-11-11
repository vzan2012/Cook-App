import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { FirebaseAuthVars } from 'src/environments/environment'

export interface AuthResponseData {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered?: boolean
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

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.firebase.getSignINURL(), {
      email, password, returnSecureToken: true
    }).pipe(
      catchError(this.handleError)
    )
  }

  // Handle Errors 
  private handleError(errResp: HttpErrorResponse) {
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
      case 'EMAIL_NOT_FOUND':
        errMsg = 'Email - NOT FOUND !!!'
        break;
      case 'INVALID_PASSWORD':
        errMsg = 'The given password is invalid !!!'
        break
      case 'USER_DISABLED':
        errMsg = 'This account is disabled by the ADMINISTRATOR !!!'
        break
    }

    return throwError(errMsg)
  }

}
