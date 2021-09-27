import { Component, OnInit } from '@angular/core';
import { UserAccountService } from './core/services/user-account.service';

@Component({
  selector: 'jm-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private userService: UserAccountService
  ) {}

  async ngOnInit() {
    console.log('AppComponent > populate > currentUser');
    await this.userService.populate();
  }
}
