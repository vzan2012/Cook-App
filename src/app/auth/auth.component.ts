import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

import { AlertComponent } from './../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  authObs!: Observable<AuthResponseData>;
  authSubscription!: Subscription;
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error!: string;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    this.isLoading = true;

    if (this.isLoginMode) {
      this.authObs = this.authService.login(
        form.value.email,
        form.value.password
      );
    } else {
      this.authObs = this.authService.signUp(
        form.value.email,
        form.value.password
      );
    }

    this.authSubscription = this.authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errResp) => {
        console.log(errResp);
        this.error = errResp;
        this.showErrorAlert(errResp);
        this.isLoading = false;
      }
    );
  }

  onHandleError() {
    this.error = null;
  }

  // Creation of Dynamic Component - For ErrorAlert
  private showErrorAlert(message: string) {
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    // TODO: Need to check the unsubscribe - bug raises
    //   this.authSubscription.unsubscribe();
    if (this.closeSub) this.closeSub.unsubscribe();
  }
}
