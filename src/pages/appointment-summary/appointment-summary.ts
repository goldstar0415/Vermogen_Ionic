import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , App} from 'ionic-angular';
import { GeneralProvider } from '../../providers/general/general';
import { LoadingController , AlertController, Loading} from 'ionic-angular';
import { URLSearchParams } from '@angular/http';
import { DatePipe } from '@angular/common'
import { CalendarviewPage } from '../calendarview/calendarview';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the AppointmentSummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-appointment-summary',
  templateUrl: 'appointment-summary.html',
})
export class AppointmentSummaryPage {
	tabBarElement : any;

  remarksData = "";

  userId = "";
  selectedServiceCentreId = "";
  mobileNumber = "";
  vehicleNumber = "";

  selectedDate = "";
  selectedTime = "";
  appointmentIdResp = "";
  fulTime = "";

  serviceCentreName = "";
  serviceAddress = "";

  displayYearDay = "";
  displayWeekDay = "";
  displayTime = "";

  loading : Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public general : GeneralProvider, private loadingCtrl: LoadingController,private alertCtrl: AlertController,  public datepipe: DatePipe, private app:App) {
  	this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  public presentConfirm() {
  let alert = this.alertCtrl.create({
    title: 'Confirm purchase',
    message: 'Do you want to buy this book?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Buy',
        handler: () => {
          console.log('Buy clicked');
        }
      }
    ]
  });
  alert.present();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppointmentSummaryPage');
  }

  public ConfirmationPrompt(text) {
    let alert = this.alertCtrl.create({
    title : 'Booking Confirmed',
    subTitle : text,
    buttons : [{
        text: 'OK',
        handler: () => {
          console.log('Ok clicked');
          this.app.getRootNav().setRoot( TabsPage,{index:0} );
          // this.navCtrl.push(BookingPage);
        }
      }]
    });
    alert.present(prompt);
  
  }

  public presentLoadingText() {

    this.loading = this.loadingCtrl.create({
     
      content: 'Please Wait...'
    });

    this.loading.present();

    
   //loading.dismiss();
  }

  public showError(text) {
          
      
      let alert = this.alertCtrl.create({
      title : '',
      subTitle : text,
      buttons : [{
        text: 'OK',
        handler: () => {
          console.log('Ok clicked');
          this.app.getRootNav().setRoot( TabsPage,{index:0} );
          // this.navCtrl.push(BookingPage);
        }
      }]
      });
      alert.present(prompt);

    
    }

  public confirmAppointment() {
    this.presentLoadingText();
    let api = 'BookAppointment';
    

    let body = new URLSearchParams();
    body.set('ResId', this.selectedServiceCentreId);
    body.set('Mobile', this.mobileNumber);
    body.set('StartDate', this.selectedDate+' '+this.selectedTime);
    body.set('UserId', this.userId);
    body.set('Remarks',this.remarksData);


    this.general.callPostApi(api, body).subscribe(
      data => {

        console.log(JSON.parse(data));
        var parsedValue = JSON.parse(data);

        this.loading.dismiss();

        if (parsedValue.Success == true) { 

          var text = 'Thank you for booking your appointment with Vermogen Auto.'+ '<br/>'+'<br/>'+'A notification via SMS will be sent to you 1 day before your servicing appointment.';

          var system = this.general.getObject("SystemValue");
          system.displayYearDayValue =  this.displayYearDay;
          system.displayTime = this.displayTime;
          system.displayWeekDay = this.displayWeekDay; 
          system.centrename = this.serviceCentreName;
          system.LoginValue = '2';
          system.RemarksValue = this.remarksData;
          system.AppointmentId = parsedValue.AppointmentId;
          this.general.setObject('SystemValue',system);
          this.ConfirmationPrompt(parsedValue.MessageConfirmation);


          this.appointmentIdResp = parsedValue.AppointmentId;
          console.log("appointment Id : " +this.appointmentIdResp);
          return true;
        } 
        else {
          this.getUpcomingAppointment('UpcomingAppointment/', parsedValue.AppointmentId);
          
          console.error("Error in Appointment");
        }

      },
      error => {
        console.error("Error in Appointment Confirmation");
      }
    );
    
  }

  public getUpcomingAppointment(apiValue,ErrorMesaage){
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
          
          system.AppointmentId = getUpcomingData.apptId;
          this.general.setObject('SystemValue',system);
          this.showError(ErrorMesaage);

          return true;
        } else {
          system.LoginValue = '1';
          this.general.setObject('SystemValue',system);
          //this.viewData = system.LoginValue;
          
          this.showError(ErrorMesaage);
          console.error("Error upcoming food!");
        }
        
      },
      error => {
        console.error("Error saving food!");
      }
     );
  }

   ionViewWillEnter(){
    this.tabBarElement.style.display = 'none';
    this.getAppointmentDetails();
    
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
   
  }

  public getAppointmentDetails() {
    var system = this.general.getObject("SystemValue");
    var count = Object.keys(system).length;
    if (count!= 0) {
      this.userId = system.userId;
      this.selectedServiceCentreId = system.selectedCentreId;
      this.mobileNumber = system.mobileNumber;
      this.vehicleNumber = system.vehicleNumber;
    }
    else {
      this.userId = "";
      this.selectedServiceCentreId = "";
      this.mobileNumber = system.mobileNumber;
    }
    this.fulTime = this.navParams.get('fTime');
    this.selectedDate = this.navParams.get('date'); 
    this.selectedTime = this.navParams.get('time');


    this.serviceCentreName =this.navParams.get('serCentreName');
    this.serviceAddress = this.navParams.get('serCentreAddress');

    this.displayYearDay = this.datepipe.transform(this.fulTime, 'MMM d, y');
    this.displayTime = this.navParams.get('disTimeValue');
    this.displayWeekDay = this.datepipe.transform(this.fulTime, 'EEE');

    console.log(this.displayYearDay +',' +this.displayWeekDay+',' +this.displayTime);
  }



  

}
