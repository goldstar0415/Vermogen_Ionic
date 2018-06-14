import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewappointmentPage } from './newappointment';

@NgModule({
  declarations: [
    NewappointmentPage,
  ],
  imports: [
    IonicPageModule.forChild(NewappointmentPage),
  ],
})
export class NewappointmentPageModule {}
