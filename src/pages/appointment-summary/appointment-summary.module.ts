import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentSummaryPage } from './appointment-summary';

@NgModule({
  declarations: [
    AppointmentSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentSummaryPage),
  ],
})
export class AppointmentSummaryPageModule {}
