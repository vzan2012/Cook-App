import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    })
  }

}
