import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeneralProvider } from '../../providers/general/general';
import { BookingPage } from '../booking/booking';
import { AlertController} from 'ionic-angular';
import { GmapsPage } from '../gmaps/gmaps';
/**
 * Generated class for the UpcomingBookingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upcoming-booking-detail',
  templateUrl: 'upcoming-booking-detail.html',
})
export class UpcomingBookingDetailPage {

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public general : GeneralProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpcomingBookingDetailPage');
  }

  ngOnInit() {
    var system = this.general.getObject("SystemValue");
    var count = Object.keys(system).length;
    if (count == 0) {
      system.LoginValue = '0';
      this.general.setObject('SystemValue',system);
    }
    else {
      var getHistoryDetails = this.navParams.get('selectedUpcomingValue');

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
    }
    else {
      var getHistoryDetails = this.navParams.get('selectedUpcomingValue');

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

    public showError(text) {
          
      
      let alert = this.alertCtrl.create({
      title : '',
      subTitle : text,
      buttons : ['OK']
      });
      alert.present(prompt);
    
    }


	public presentConfirm() {
		let alert = this.alertCtrl.create({
			title: 'Cancel the booking?',
			cssClass: 'alert-wrapper-vermogen',
			buttons: [
			{
			  text: 'No, Go Back',
			  cssClass: 'alert-wrapper-vermogen-button',
			  role: 'cancel',
			  handler: () => {
			    console.log('Cancel clicked');
			  }
			},
			{
			  text: 'Cancel Booking',
			  cssClass: 'alert-wrapper-vermogen-cancelButton',
			  handler: () => {
			    console.log('Booking Cancel');
			    this.CancelAppointment();
			  }
			}
			]
		});
		alert.present();
	}

	public getUpcomingAppointment(apiValue){
	    //this.presentLoadingText();
	    var system = this.general.getObject("SystemValue");
	    let api = apiValue+system.userId+','+system.mobileNumber+' ';
	    //let parsedValue = {};
	   

	    this.general.callApi(api, "").subscribe(
	      data => {

			console.log(JSON.parse(data));
			var parsedValue = JSON.parse(data);
			var getUpcomingData = parsedValue.UpcomingAppointment[0];
			//this.loading.dismiss();
			if (parsedValue.Success == true) {
			  
			  system.LoginValue = '2';
			  this.general.setObject('SystemValue',system);
			  this.navCtrl.push(BookingPage);


			  this.displayYearData = getUpcomingData.date;
			  this.displayWeekData = getUpcomingData.dayofweek;
			  this.displayTimeData = getUpcomingData.time;
			  this.displayMobileNumber = getUpcomingData.mobile;
			  this.displayVehicleNumber = system.vehicleNumber;
			  this.displayServiceCentreAddress = getUpcomingData.servicecentreName;
			  this.displayRemarks = getUpcomingData.remarks;
			  this.selectedCntreLat = getUpcomingData.servicecentreLatitude;
			  this.selectedCntreLng = getUpcomingData.servicecentreLongitude;
			  
			  system.AppointmentId = getUpcomingData.apptId;
			  this.general.setObject('SystemValue',system);

			  return true;
			} else {
			  
			  	system.LoginValue = '1';
				this.general.setObject('SystemValue',system);
				this.navCtrl.push(BookingPage);
			  console.error("Error upcoming food!");
			}

			},
			error => {
				console.error("Error saving food!");
			}
	     );
  }

	public CancelAppointment() {

		var system = this.general.getObject("SystemValue");
		let api = 'CancelAppointment/'+system.AppointmentId;

		this.general.callApi(api, "").subscribe(
			data => {

			console.log(JSON.parse(data));

			var parsedValue = JSON.parse(data);

			if (parsedValue.Success == true) {
				
				this.getUpcomingAppointment('UpcomingAppointment/');
				return true;
			} 
			else {
				this.showError("Cancel Failed");
			}

			},
			error => {
				//this.loading.dismiss();
				console.error("Server Error"+error);
			}
		);
	}

	openLocation(latitude, longitude, serviceResourceName) {
	    this.navCtrl.push(GmapsPage, {serviceCentreLatitude : latitude, serviceCntreLongitude:longitude, serviceCentreName : serviceResourceName});
	}

}
