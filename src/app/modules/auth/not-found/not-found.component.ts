import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { UserAccountService } from '../../../core/services/user-account.service';

@Component({
  selector: 'jm-not-found',
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit {

  isAuthenticated: boolean;

  constructor(
    private userService: UserAccountService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  async goToHome() {
    await this.router.navigate(['']);
  }
}
