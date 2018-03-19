import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {AuthGuard} from '../../core/auth.guard';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
  }

}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: HomeComponent}])
  ],
  exports: [
    RouterModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {
}
