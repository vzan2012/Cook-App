import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  signUpSubscription !: Subscription
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
      // this.error = '';
    } else {
      this.signUpSubscription = this.authService.signUp(form.value.email, form.value.password).subscribe(resData => {
        console.log(resData);
        this.isLoading = false
      }, err => {
        console.log(err);
        this.error = 'An error occured !!!'
        this.isLoading = false
      })
    }

  }

  ngOnDestroy() {
    this.signUpSubscription.unsubscribe();
  }

}
