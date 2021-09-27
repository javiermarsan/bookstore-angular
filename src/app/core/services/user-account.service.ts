import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { concatMap } from 'rxjs/operators';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { UserAccount } from '../models/user-account.model';
import { componentDestroyed } from '../rxjs/component-destroyed';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  private pathUser = '/user/logged';
  private currentUserSubject = new BehaviorSubject<UserAccount>(null);
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);

  //public currentUser: Observable<UserAccount> = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
  public isAuthenticated: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  public getCurrentUser(): UserAccount {
    return this.currentUserSubject.getValue();
  }

  // If JWT detected, attempt to get & store user's info.
  // This runs once on application startup.
  // També estem executant a attemptAuth()
  public async populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      try {
        const data = await this.attemptUser();
        this.setUser(data);
      }
      catch(error) {
        this.purgeAuth();
      }
    }
    else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }
  
  public async attemptAuth(credentials): Promise<UserAccount> {
    const pwd = credentials.password;

    const data = await this.apiService.authToken(credentials.email, pwd);
    this.setAuth(data.token, data.refreshToken);
    
    const usr = await this.attemptUser();
    this.setUser(usr);

    return usr;
  }

  public purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();

    this.currentUserSubject.next(null);
    // Set current user to an empty object
    // this.currentUserSubject.next({} as UserAccount);

    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  private async attemptUser(): Promise<UserAccount> {
    return await this.apiService.get(this.pathUser);
  }

  private setAuth(token: string, refreshToken: string) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(token);
    this.jwtService.saveRefreshToken(refreshToken);
  }

  private setUser(user: UserAccount) {
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }
}
