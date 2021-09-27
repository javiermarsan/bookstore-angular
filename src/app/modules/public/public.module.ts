import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  imports: [
    SharedModule,
    PublicRoutingModule,
    ProgressBarModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class PublicModule { }
