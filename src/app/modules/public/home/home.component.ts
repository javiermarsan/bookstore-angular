import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/services/alert.service';
import { UserAccountService } from 'src/app/core/services/user-account.service';

@Component({
  selector: 'jm-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    private authenticated: boolean = false;

    constructor(
        private alertService: AlertService,
        private userService: UserAccountService) { }

    ngOnInit() {
        this.userService.isAuthenticated.subscribe(
            async (authenticated) => {
                this.authenticated = authenticated;
            }
        );
    }
}
