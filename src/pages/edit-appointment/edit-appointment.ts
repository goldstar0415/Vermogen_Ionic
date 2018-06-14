import { Component , OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeneralProvider } from '../../providers/general/general';
import { GmapsPage } from '../gmaps/gmaps';
/**
 * Generated class for the EditAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-appointment',
  templateUrl: 'edit-appointment.html',
})
export class EditAppointmentPage implements OnInit{
	viewData : any;
	displayYearData = "";
	displayWeekData = "";
	displayTimeData = "";
	displayMobileNumber = "";
	displayVehicleNumber = "";
	displayServiceCentreName = "";
	displayServiceCentreAddress = "";
	displayRemarks = "";
  selectedCntreLat = "";
  selectedCntreLng = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public general : GeneralProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAppointmentPage');
  }

  ngOnInit() {
    var system = this.general.getObject("SystemValue");
    var count = Object.keys(system).length;
    if (count == 0) {
      system.LoginValue = '0';
      this.general.setObject('SystemValue',system);
      this.viewData = system.LoginValue;
    }
    else {
      this.viewData = system.LoginValue;
      var getHistoryDetails = this.navParams.get('selectedValue');

      this.displayYearData = getHistoryDetails.date;
      this.displayWeekData = getHistoryDetails.dayofweek;
      this.displayTimeData = getHistoryDetails.time;
      this.displayMobileNumber = getHistoryDetails.mobile;
      this.displayVehicleNumber = system.vehicleNumber;
      this.displayServiceCentreName = getHistoryDetails.servicecentreName
      this.displayServiceCentreAddress = getHistoryDetails.servicecentreAddress;
      this.displayRemarks = getHistoryDetails.remarks;
      this.selectedCntreLat = getHistoryDetails.servicecentreLatitude;
      this.selectedCntreLng = getHistoryDetails.servicecentreLongitude;

      
    }

  }

  ionViewWillEnter() {
    var system = this.general.getObject("SystemValue");
    var count = Object.keys(system).length;
    if (count == 0) {
      system.LoginValue = '0';
      this.general.setObject('SystemValue',system);
      this.viewData = system.LoginValue;
    }
    else {
      this.viewData = system.LoginValue;
      var getHistoryDetails = this.navParams.get('selectedValue');

      this.displayYearData = getHistoryDetails.date;
      this.displayWeekData = getHistoryDetails.dayofweek;
      this.displayTimeData = getHistoryDetails.time;
      this.displayMobileNumber = getHistoryDetails.mobile;
      this.displayVehicleNumber = system.vehicleNumber;
      this.displayServiceCentreName = getHistoryDetails.servicecentreName
      this.displayServiceCentreAddress = getHistoryDetails.servicecentreAddress;
      this.displayRemarks = getHistoryDetails.remarks;
      this.selectedCntreLat = getHistoryDetails.servicecentreLatitude;
      this.selectedCntreLng = getHistoryDetails.servicecentreLongitude;
    }
    
  }

  openLocation(latitude, longitude, serviceResourceName) {
      this.navCtrl.push(GmapsPage, {serviceCentreLatitude : latitude, serviceCntreLongitude:longitude, serviceCentreName : serviceResourceName});
  }

}
