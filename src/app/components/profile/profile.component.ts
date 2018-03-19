import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthService} from '../../core/auth.service';
import {MatExpansionModule, MatInputModule} from '@angular/material';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  panelOpenState = false;
  profileForm: FormGroup;

  constructor(public auth: AuthService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initProfileForm();
  }

  initProfileForm(): void {
    this.profileForm = this.fb.group({
      login: ['', Validators.minLength(5)],
      email: ['', Validators.email]
    });
  }

}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatInputModule,
    RouterModule.forChild([{path: '', component: ProfileComponent}])
  ],
  exports: [
    RouterModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule {
}
