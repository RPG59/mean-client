import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) {
    this.loginForm = fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login(): void {
    console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value.login, this.loginForm.value.password).subscribe(res => {
      console.log(res);
      if (!res.success) {
        return;
      }
      this.router.navigateByUrl('app');
    }, err => {
      console.log(err);
    });
  }
}


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }])
  ],
  exports: [
    RouterModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {
}
