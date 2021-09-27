import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from './services/admin.service';
import { throwIfAlreadyLoaded } from '../core/guards/module-import.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { ManagerAuthGuard } from './guards/manager-auth.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AdminService,
    AdminAuthGuard,
    ManagerAuthGuard
  ]
})
export class LogicModule {
  constructor(@Optional() @SkipSelf() parentModule: LogicModule) {
    throwIfAlreadyLoaded(parentModule, 'LogicModule');
  }
}
