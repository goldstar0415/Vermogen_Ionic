import { Component , OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookingHistoryPage } from '../booking-history/booking-history';
import { GeneralProvider } from '../../providers/general/general';
import { NewappointmentPage } from '../newappointment/newappointment';
import { LoadingController , AlertController, Loading} from 'ionic-angular';
import { UpcomingBookingDetailPage } from '../upcoming-booking-detail/upcoming-booking-detail';
/**
 * Generated class for the BookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})

export class BookingPage implements OnInit{

	loading : Loading;
	viewData : any;
	getUpcomingData = {};

	displayYearData = "";
	displayWeekData = "";
	displayTimeData = "";
	displayMobileNumber = "";
	displayVehicleNumber = "";
	displayServiceCentreAddress = "";
	displayRemarks = "";
	serviceCentreLat = "";
	serviceCentreLng = "";

	constructor(public navCtrl: NavController, public navParams: NavParams, public general : GeneralProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BookingPage');
	}

	ngOnInit() {

		var system = this.general.getObject("SystemValue");
		var count = Object.keys(system).length;
		if (count == 0 || system.LoginValue == 0) {
			system.LoginValue = '0';
			this.general.setObject('SystemValue',system);
			this.viewData = system.LoginValue;
		}
		this.viewData = system.LoginValue;
		this.getUpcomingAppointment();
		// else if(system.LoginValue == '1'){
		// 	this.viewData = system.LoginValue;
		// }
		// else {
			
		// }

	}


	ionViewWillEnter() {
		var system = this.general.getObject("SystemValue");
		var count = Object.keys(system).length;
		if (count == 0 || system.LoginValue == 0) {
			system.LoginValue = '0';
			this.general.setObject('SystemValue',system);
			this.viewData = system.LoginValue;
		}
		this.viewData = system.LoginValue;
		this.getUpcomingAppointment();
		// else if(system.LoginValue == '1'){
		// 	this.viewData = system.LoginValue;
		// }
		// else {
		// 	this.viewData = system.LoginValue;
		// 	this.getUpcomingAppointment();
		// }
	}

	public showError(text) {

		let alert = this.alertCtrl.create({
		title : '',
		subTitle : text,
		buttons : ['OK']
		});
		alert.present(prompt);
    
    }

  	public getUpcomingAppointment(){
		//this.presentLoadingText();
		var system = this.general.getObject("SystemValue");
		let api = 'UpcomingAppointment/'+system.userId+','+system.mobileNumber+' ';
		//let parsedValue = {};

		this.general.callApi(api, "").subscribe(
			data => {
				debugger
				console.log(JSON.parse(data));
				var parsedValue = JSON.parse(data);
				this.getUpcomingData = parsedValue.UpcomingAppointment[0];
				//this.loading.dismiss();
				if (parsedValue.Success == true) {
					system.LoginValue = '2';
					this.viewData = system.LoginValue;
					this.general.setObject('SystemValue',system);
					this.displayYearData = parsedValue.UpcomingAppointment[0].date;
					this.displayWeekData = parsedValue.UpcomingAppointment[0].dayofweek;
					this.displayTimeData = parsedValue.UpcomingAppointment[0].time;
					this.displayMobileNumber = parsedValue.UpcomingAppointment[0].mobile;
					this.displayVehicleNumber = system.vehicleNumber;
					this.displayServiceCentreAddress = parsedValue.UpcomingAppointment[0].servicecentreName;
					this.displayRemarks = parsedValue.UpcomingAppointment[0].remarks;
					this.serviceCentreLat = parsedValue.UpcomingAppointment[0].servicecentreLatitude;
					this.serviceCentreLng = parsedValue.UpcomingAppointment[0].servicecentreLongitude;
					return true;
				} else {
					 if(system.LoginValue !='0')
                      {
                          system.LoginValue = '1';
                          this.general.setObject('SystemValue',system);
                          this.viewData = system.LoginValue;
                          console.error("Error upcoming food!");
                      }
				}

			},
			error => {
				console.error("Error saving food!");
			}
		);
	}

	public BookAppointment() {
		var system = this.general.getObject("SystemValue");
		var count = Object.keys(system).length;
		if (count == 0 || system.LoginValue == 0) {

			this.showError("Please login first to book an appointment");
			
		}
		else {
			this.navCtrl.push(NewappointmentPage);
		}
		//this.navCtrl.push(NewappointmentPage);

	}

	public goToBookingHistory() :void {
		this.navCtrl.push(BookingHistoryPage);
	}

	public presentLoadingText() {

		this.loading = this.loadingCtrl.create({
		 
		  content: 'Please Wait...'
		});

		this.loading.present();


		//loading.dismiss();
	}


	public presentConfirm(event:Event) {
		
		event.stopPropagation();
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
					this.CancelAppointment();
					console.log('Buy clicked');
				  }
				}
		  	]
		});
		alert.present();
	}



	public CancelAppointment() {
		this.presentLoadingText();

		var system = this.general.getObject("SystemValue");
		let api = 'CancelAppointment/'+system.AppointmentId;

		this.general.callApi(api, "").subscribe(
			data => {

				console.log(JSON.parse(data));
				var parsedValue = JSON.parse(data);
				this.loading.dismiss();

				if (parsedValue.Success == true) {
					this.getUpcomingAppointment();
					
					return true;

				} else {
				  this.showError("Cancel Failed");
				}

			},
			error => {
				this.loading.dismiss();
				console.error("Server Error"+error);
			}
		);

	}

	public UpcomingAppoitmentDetails() {
		this.navCtrl.push(UpcomingBookingDetailPage ,{ selectedUpcomingValue : this.getUpcomingData});
	}

}
