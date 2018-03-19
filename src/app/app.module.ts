import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {AuthGuard} from './core/auth.guard';
import {AuthService} from './core/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatToolbarModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

const routes = [
  {path: '', redirectTo: '/app', pathMatch: 'full'},
  {path: 'app', loadChildren: 'app/components/components.module#ComponentsModule'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatInputModule,
    RouterModule.forRoot(routes)
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatInputModule],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
