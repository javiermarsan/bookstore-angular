import { Component, OnInit, Input } from '@angular/core';
import { JwtService } from './../../../core/services/jwt.service';
import { Router } from '@angular/router';
import { UserAccount } from '../../../core/models/user-account.model';
import { UserAccountService } from '../../../core/services/user-account.service';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'jm-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserAccountService
  ) { }

  currentUser: UserAccount;
  allowAdmin: boolean = false;
  allowManager: boolean = false;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        if (authenticated) {
          this.currentUser = this.userService.getCurrentUser();
          if (this.currentUser) {
            this.allowAdmin = this.currentUser.role == 'A';
            this.allowManager = this.currentUser.role == 'M' || this.allowAdmin;
          }
        }
      }
    );
  }

  async logout() {
    this.userService.purgeAuth();
    await this.router.navigateByUrl(AppSettings.UrlLogin);
  }

}
