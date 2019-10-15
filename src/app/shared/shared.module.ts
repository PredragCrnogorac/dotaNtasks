import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import {ProgressBarModule} from 'primeng/progressbar';
import {BlockUIModule} from 'primeng/blockui';
import {ConfirmDialogModule} from 'primeng/confirmdialog';


import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { AngularFireAuth } from '@angular/fire/auth';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxYoutubePlayerModule.forRoot(),
    ChartModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    DynamicDialogModule,
    ButtonModule,
    InputTextModule,
    NgbModule,
    TableModule,
    DropdownModule,
    CheckboxModule,
    CalendarModule,
    ProgressBarModule,
    BlockUIModule,
    ConfirmDialogModule,
  ],
  exports: [
    CardModule,
    NgxYoutubePlayerModule,
    ChartModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    DynamicDialogModule,
    ButtonModule,
    InputTextModule,
    NgbModule,
    TableModule,
    DropdownModule,
    CheckboxModule,
    CalendarModule,
    ProgressBarModule,
    BlockUIModule,
    ConfirmDialogModule,
  ],
  entryComponents: [
  ],
  providers: [MessageService, AngularFireAuth],
})
export class SharedModule { }
