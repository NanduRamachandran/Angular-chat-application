import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  RegistrationForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    repassword: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
  });
  isInvalidRegistration: boolean = false;
  isPasswordMissMatch: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  RegisterUser() {
    this.RegistrationForm.markAllAsTouched();
    if (this.RegistrationForm.value.password != this.RegistrationForm.value.repassword) {
      this.isPasswordMissMatch = true;
    }
    if (this.RegistrationForm.valid) {
      this.subscriptions.push(this.userService.RegisterUser(this.RegistrationForm.value.name, this.RegistrationForm.value.email, this.RegistrationForm.value.password).subscribe(data => {
        this.router.navigateByUrl('/login');
      }, err => {
        console.log(err);
      }));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => {
      x.unsubscribe();
    });
  }
}

