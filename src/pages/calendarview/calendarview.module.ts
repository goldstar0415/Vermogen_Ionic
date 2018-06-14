import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarviewPage } from './calendarview';

@NgModule({
  declarations: [
    CalendarviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarviewPage),
  ],
})
export class CalendarviewPageModule {}
