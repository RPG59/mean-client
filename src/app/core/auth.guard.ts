import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {filter, map} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private  auth: AuthService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isUpdate$.getValue()) {
      return this.auth.isUpdate$.pipe(filter(x => !x), map(() => this.isAuthUser()));
    }

    return this.isAuthUser();

  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }

  checkLogin(url: string): boolean {
    return true;
  }

  isAuthUser(): boolean {
    console.log(this.auth.isUpdate$.getValue());
    console.log(this.auth.user);
    if (!this.auth.user) {
      this.router.navigateByUrl('app/login');
      return false;
    } else {
      return true;
    }
  }

}
