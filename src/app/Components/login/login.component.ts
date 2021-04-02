import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  LoginForm = new FormGroup({
    password: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
  });
  isInvalidLogin: boolean = false;
  loginMessage: string = "";
  loginDetails: any;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }

  LoginUser() {
    this.loginMessage = "";
    this.LoginForm.markAllAsTouched();
    if (this.LoginForm.valid) {
      this.subscriptions.push(this.userService.LoginUser(this.LoginForm.value.email, this.LoginForm.value.password).subscribe(data => {
        this.loginDetails = data;
        let queryParams = { userId: this.loginDetails['id'] }
        this.router.navigate(['/home'], { queryParams: queryParams });
      }, err => {
        if (err.status == 401) {
          this.loginMessage = "Password is incorrect";
        }
        else if (err.status == 404) {
          this.loginMessage = "User not found"
        }

        this.isInvalidLogin = true;
        console.log(err);
      }));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
