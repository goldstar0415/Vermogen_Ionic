import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditAppointmentPage } from './edit-appointment';

@NgModule({
  declarations: [
    EditAppointmentPage,
  ],
  imports: [
    IonicPageModule.forChild(EditAppointmentPage),
  ],
})
export class EditAppointmentPageModule {}
