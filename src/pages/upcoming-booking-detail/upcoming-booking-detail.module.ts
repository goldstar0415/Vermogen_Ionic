import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpcomingBookingDetailPage } from './upcoming-booking-detail';

@NgModule({
  declarations: [
    UpcomingBookingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(UpcomingBookingDetailPage),
  ],
})
export class UpcomingBookingDetailPageModule {}
