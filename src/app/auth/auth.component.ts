import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  authObs!: Observable<AuthResponseData>;
  authSubscription !: Subscription;
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error!: string;

  constructor(private authService: AuthService, private router: Router) { }

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
      this.router.navigate(['/recipes']);
    }, errResp => {
      console.log(errResp);
      this.error = errResp
      this.isLoading = false
    })

  }

  ngOnDestroy() {
    // TODO: Need to check the unsubscribe - bug raises 
    //   this.authSubscription.unsubscribe();
  }

}
