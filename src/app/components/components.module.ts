import { MatButtonModule } from '@angular/material';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../core/auth.guard';
import {RegistrationComponent} from './registration/registration.component';
import {ProfileComponent} from './profile/profile.component';

const routes = [
  {path: '', loadChildren: 'app/components/home/home.component#HomeModule'},
  {path: 'login', loadChildren: 'app/components/login/login.component#LoginModule'},
  {path: 'profile', loadChildren: 'app/components/profile/profile.component#ProfileModule', canActivate: [AuthGuard]},
  {path: 'registration', loadChildren: 'app/components/registration/registration.component#RegistrationModule'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: [AuthGuard]
})
export class ComponentsModule {
}
