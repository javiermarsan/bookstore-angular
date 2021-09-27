import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccountService } from '../../../core/services/user-account.service';
import { ApiErrors, ApiError } from '../../../core/models/api-errors.model';
import { take } from 'rxjs/operators';
import { UserAccount } from '../../../core/models/user-account.model';

@Component({
  selector: 'jm-login',
  templateUrl: './login-token.component.html' 
})
export class LoginComponent implements OnInit {
  errors: ApiErrors = null;
  authForm: FormGroup;
  isLoading = true;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserAccountService,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() { }

  async submitFormToken() {
    const credentials = this.authForm.value;
    try {
      this.isSubmitting = true;
      const data: UserAccount = await this.userService.attemptAuth(credentials);
      this.isSubmitting = false;

      await this.router.navigateByUrl('');
    }
    catch (error) {
      this.isSubmitting = false;
      this.errors = error;
    }
  }
}
