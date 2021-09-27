import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { distinctUntilChanged } from 'rxjs/operators';
import { UserAccountService } from '../services/user-account.service';
import { AppSettings } from 'src/app/app-settings';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private userService: UserAccountService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.can(route, state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.can(route, state);
  }

  private can(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const ob = this.userService.isAuthenticated.pipe(take(1));

    ob.subscribe(async (authenticated) => {
      if (!authenticated) {
        await this.router.navigate([AppSettings.UrlLogin]);
        // this.router.navigate([AppSettings.UrlLogin], { queryParams: { returnUrl: state.url } });
      }
    });

    return ob;
  }
}
