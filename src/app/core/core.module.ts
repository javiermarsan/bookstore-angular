import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAuthInterceptor } from './interceptors/http-auth.interceptor';
import { ApiService } from './services/api.service';
import { JwtService } from './services/jwt.service';
import { UserAccountService } from './services/user-account.service';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AlertService } from './services/alert.service';
import { throwIfAlreadyLoaded } from './guards/module-import.guard';
import { AppConfigService } from './services/app-config.service';
import { UtilityService } from './services/utility.service';
import { HttpDateInterceptor } from './interceptors/http-date.interceptor';

/*
  The CoreModule should contain singleton services (which is usually the case),
  universal components and other features where there’s only once instance per application.
  To prevent re-importing the core module elsewhere, you should also add a guard for it
  in the core module’ constructor.
*/

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpDateInterceptor, multi: true },
    AuthGuard,
    NoAuthGuard,
    AppConfigService,
    ApiService,
    JwtService,
    UserAccountService,
    AlertService,
    UtilityService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
