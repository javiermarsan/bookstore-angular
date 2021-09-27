import { Component, OnInit, Input } from '@angular/core';
import { JwtService } from './../../../core/services/jwt.service';
import { Router } from '@angular/router';
import { UserAccount } from '../../../core/models/user-account.model';
import { UserAccountService } from '../../../core/services/user-account.service';

@Component({
  selector: 'jm-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
}
