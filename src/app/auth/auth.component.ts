import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authObs!: Observable<AuthResponseData>;
  authSubscription !: Subscription
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error!: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    this.isLoading = true;

    if (this.isLoginMode) {
      this.authObs = this.authService.login(form.value.email, form.value.password);
    } else {
      this.authObs = this.authService.signUp(form.value.email, form.value.password)
    }

    this.authSubscription = this.authObs.subscribe(resData => {
      console.log(resData);
      this.isLoading = false
    }, errResp => {
      console.log(errResp);
      this.error = errResp
      this.isLoading = false
    })

  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
