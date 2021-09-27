import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ListErrorsComponent } from './components/list-errors/list-errors.component';
import { ShowAuthedDirective } from './directives/show-authed.directive';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { AlertComponent } from './components/alert/alert.component';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { LayoutComponent } from './layout/layout.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { PluralPipe } from './pipes/plural.pipe';
import { RoundPipe } from './pipes/round.pipe';
import { TimingPipe } from './pipes/timing.pipe';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormValidationComponent } from './components/form-validation/form-validation.component';
import { TableQueryComponent } from './components/table-query/table-query.component';
import { HexadecimalValueValidator } from './validators/hexadecimal-validator';
import { FormDateComponent } from './components/form-date/form-date.component';

/*
  The SharedModule can be imported in any other module when those items will be re-used.
  The shared module shouldn’t have any dependency to the rest of the application and should
  therefore not rely on any other module.
*/

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    DynamicDialogModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    TableModule,
    ProgressBarModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    SelectButtonModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    ListErrorsComponent,
    ShowAuthedDirective,
    AlertComponent,
    LayoutComponent,
    CapitalizePipe,
    PluralPipe,
    RoundPipe,
    TimingPipe,
    ModalDeleteComponent,
    FormInputComponent,
    FormSelectComponent,
    FormValidationComponent,
    TableQueryComponent,
    HexadecimalValueValidator,
    FormDateComponent
  ],
  exports: [
    CommonModule,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ListErrorsComponent,
    RouterModule,
    ShowAuthedDirective,
    AlertComponent,
    ModalDeleteComponent,
    CapitalizePipe,
    PluralPipe,
    RoundPipe,
    TimingPipe,
    FormInputComponent,
    FormSelectComponent,
    FormValidationComponent,
    TableQueryComponent,
    HexadecimalValueValidator,
    FormDateComponent
  ]
})
export class SharedModule { }
