import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsurancePage } from './insurance';

@NgModule({
  declarations: [
    InsurancePage,
  ],
  imports: [
    IonicPageModule.forChild(InsurancePage),
  ],
})
export class InsurancePageModule {}
