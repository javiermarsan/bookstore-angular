import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountService } from '../../../core/services/user-account.service';

@Component({
  selector: 'jm-forbidden',
  templateUrl: './forbidden.component.html'
})
export class ForbiddenComponent implements OnInit {

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
