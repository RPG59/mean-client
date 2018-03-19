import {Component, NgModule, OnInit} from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  regForm: FormGroup;

  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private router: Router) {
    this.regForm = fb.group({
      login: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      rePassword: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  registration(): void {
    if (this.regForm.invalid) {
      return;
    }

    this.auth.registration(this.regForm.value.login,
      this.regForm.value.email,
      this.regForm.value.password).subscribe(this.registrationResHandler, this.registrationErrorHandler);
  }

  registrationResHandler(res): void {
    console.log(res);
    if (!res.success) {
      return;
    }
    this.router.navigateByUrl('app');
  }

  registrationErrorHandler(err): void {
    console.log(err);
  }

}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule.forChild([{path: '', component: RegistrationComponent}])
  ],
  exports: [
    RouterModule
  ],
  declarations: [RegistrationComponent]
})
export class RegistrationModule {
}
