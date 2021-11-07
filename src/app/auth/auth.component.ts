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


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    if (this.isLoginMode) {

    } else {
      this.signUpSubscription = this.authService.signUp(form.value.email, form.value.password).subscribe(resData => console.log(resData), err => console.log(err))
    }

  }

  ngOnDestroy() {
    this.signUpSubscription.unsubscribe();
  }

}
