import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { FirebaseAuthVars } from 'src/environments/environment';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  private firebase = new FirebaseAuthVars();

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.firebase.getSignUpURL(), {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((respData) =>
          this.handleAuthentication(
            respData.email,
            respData.localId,
            respData.idToken,
            +respData.expiresIn
          )
        )
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.firebase.getSignINURL(), {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((respData) =>
          this.handleAuthentication(
            respData.email,
            respData.localId,
            respData.idToken,
            +respData.expiresIn
          )
        )
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  // Handle Authentication
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);

    // Use LocalStorage - to save the userdata in the browser
    localStorage.setItem('userData', JSON.stringify(user));
  }

  // Handle Errors
  private handleError(errResp: HttpErrorResponse) {
    let errMsg = 'An unknown error occured !!!';
    if (!errResp.error || !errResp.error.error) return throwError(errMsg);

    switch (errResp.error.error.message) {
      case 'EMAIL_EXISTS':
        errMsg = 'Email already exists !!!';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errMsg = 'This operations is not allowed !!!';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errMsg = 'Tried with many attempts !!!';
        break;
      case 'EMAIL_NOT_FOUND':
        errMsg = 'Email - NOT FOUND !!!';
        break;
      case 'INVALID_PASSWORD':
        errMsg = 'The given password is invalid !!!';
        break;
      case 'USER_DISABLED':
        errMsg = 'This account is disabled by the ADMINISTRATOR !!!';
        break;
    }

    return throwError(errMsg);
  }
}
