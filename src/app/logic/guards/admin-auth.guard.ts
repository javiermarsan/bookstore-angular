import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { distinctUntilChanged } from 'rxjs/operators';
import { UserAccountService } from '../../core/services/user-account.service';
import { UserAccount } from '../../core/models/user-account.model';

@Injectable()
export class AdminAuthGuard implements CanActivate, CanActivateChild {
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
      if (authenticated) {
        const user: UserAccount = this.userService.getCurrentUser();
        if (!user || user.role != 'A') { // Admin role
          await this.router.navigate(['auth/403']);
        }
      }

      if (!authenticated) {
        await this.router.navigate(['auth/login']);
      }
    });

    return ob;
  }
}
