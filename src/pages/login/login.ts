import { Component , OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeneralProvider } from '../../providers/general/general';
import { NewappointmentPage } from '../newappointment/newappointment';
import { LoadingController , AlertController, Loading} from 'ionic-angular';
import { FCM, NotificationData } from "@ionic-native/fcm";
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';
// import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{
  loading : Loading;
  viewData : any;

  

  displayYearData = "";
  displayWeekData = "";
  displayTimeData = "";
  displayMobileNumber = "";
  displayVehicleNumber = "";
  displayServiceCentreAddress = "";
  displayRemarks = "";

  registerCredentials = { mobileNumber : '+65'+'', vehicleNumber: '',DeviceId: '', udid: '', appVersion: '',platform: 1,clientInfo: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public general : GeneralProvider, private loadingCtrl: LoadingController, private alertCtrl: AlertController,private fcm:FCM,private appVersion: AppVersion,private device: Device) {
    console.log('constructor LoginPage');
    alert('1');
 fcm.getToken()
      .then(token => {
         alert('2');
        //alert("data");
           this.registerCredentials.DeviceId = token;
           console.log(`The token is ${token}`);
           //this.navCtrl.setRoot(TabsPage);

         })
         .catch(error => {
           //alert("error");
            alert('3');
            alert(error);
           console.error('Error getting token', error)
           });
         

         fcm.onTokenRefresh()
         .subscribe(token =>{
           this.registerCredentials.DeviceId = token;
           //this.navCtrl.setRoot(TabsPage);
           //alert("refresh");
           console.log(`Got a new token ${token}`);
         });
 alert('31');
         if (this.device.platform == 'Browser') {
           
         }
         else {
 alert('4');
         this.registerCredentials.udid = device.uuid;
 alert('5');

         this.registerCredentials.platform = 1;
         if (this.device.platform == 'iOS') {
           this.registerCredentials.platform = 1;
         }
         
         if (this.device.platform =='Android') {
             this.registerCredentials.platform = 2;
             console.log("running on Android device!");
         }
 alert('6');
         this.registerCredentials.clientInfo = device.model + '(' + device.version + ')';
        

        this.appVersion.getVersionNumber().then((appVer) => {
          this.registerCredentials.appVersion = appVer;
          console.log(appVer);
          console.log(this.registerCredentials.appVersion);
        })
         }
          alert('7');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  ngOnInit() {
    var system = this.general.getObject("SystemValue");
    var count = Object.keys(system).length;
    if (count == 0 || system.LoginValue == 0) {
      system.LoginValue = '0';
      this.general.setObject('SystemValue',system);
      this.viewData = system.LoginValue;
    }
    else {
      this.viewData = system.LoginValue;
      this.getUpcomingAppointment('UpcomingAppointment/');
      //if(system.LoginValue == '2'){

        //http://www.meridians2.com:8888/api/UpcomingAppointment/1,6582028668
        
        // this.displayYearData = system.displayYearDayValue;
        // this.displayWeekData = system.displayWeekDay;
        // this.displayTimeData = system.displayTime;
        // this.displayMobileNumber = system.mobileNumber;
        // this.displayVehicleNumber = system.vehicleNumber;
        // this.displayServiceCentreAddress = system.centrename;
        // this.displayRemarks = system.RemarksValue;
      //}
    }

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
          this.viewData = system.LoginValue;

          this.displayYearData = getUpcomingData.date;
          this.displayWeekData = getUpcomingData.dayofweek;
          this.displayTimeData = getUpcomingData.time;
          this.displayMobileNumber = getUpcomingData.mobile;
          this.displayVehicleNumber = system.vehicleNumber;
          this.displayServiceCentreAddress = getUpcomingData.servicecentreName;
          this.displayRemarks = getUpcomingData.remarks;
          
          system.AppointmentId = getUpcomingData.apptId;
          this.general.setObject('SystemValue',system);

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
        // this.checkButton = this.getTimeSlotData.TimeSlots[9];
        // this.checkButton1 = this.getTimeSlotData.TimeSlots[10];
        // this.checkButton2 = this.getTimeSlotData.TimeSlots[11];
        // this.checkButton3 = this.getTimeSlotData.TimeSlots[12];
        // this.checkButton4 = this.getTimeSlotData.TimeSlots[13];
        // this.checkButton5 = this.getTimeSlotData.TimeSlots[14];
        // this.checkButton6 = this.getTimeSlotData.TimeSlots[15];
        // this.checkButton7 = this.getTimeSlotData.TimeSlots[16];
        // console.log("timeslots" +this.getTimeSlotData.TimeSlots[9]);
        //return true;
      },
      error => {
        console.error("Error saving food!");
      }
     );
  }

   ionViewWillEnter(){
    var system = this.general.getObject("SystemValue");
    var count = Object.keys(system).length;
    if (count == 0 || system.LoginValue == 0) {
      system.LoginValue = '0';
      this.general.setObject('SystemValue',system);
      this.viewData = system.LoginValue;
    }
    else {
      this.viewData = system.LoginValue;
      this.getUpcomingAppointment('UpcomingAppointment/');
      //if(system.LoginValue == '2'){
        
        // this.displayYearData = system.displayYearDayValue;
        // this.displayWeekData = system.displayWeekDay;
        // this.displayTimeData = system.displayTime;
        // this.displayMobileNumber = system.mobileNumber;
        // this.displayVehicleNumber = system.vehicleNumber;
        // this.displayServiceCentreAddress = system.centrename;
        // this.displayRemarks = system.RemarksValue;
      //}
    }
    
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
      buttons : ['OK']
      });
      alert.present(prompt);
    
    }

  public login() {
    this.presentLoadingText();

    if (this.registerCredentials.vehicleNumber == null || this.registerCredentials.vehicleNumber == "") { 
      this.loading.dismiss();
      this.showError("Enter the Vehicle Number");
      
    } else if (this.registerCredentials.mobileNumber == null || this.registerCredentials.mobileNumber.length<=5) {
      this.loading.dismiss();
      this.showError("Enter the Mobile Number");
    }
    else {
      //this.registerCredentials.mobileNumber = phoneNumber;

        this.general.loginCheck(this.registerCredentials).subscribe(allowed=> {
          debugger
          if (allowed) { 
            var system = this.general.getObject("SystemValue");
            this.loading.dismiss();
            this.viewData = system.LoginValue;
            if (system.LoginValue == '2') {
              this.getUpcomingAppointment('UpcomingAppointment/');
            }
            if (system.LoginValue == '0') {
              this.showError("INVALID LOGIN");
            }
            
            console.log("done");

            //this.navCtrl.push(MainPage);
          } else {
            
            console.log("Error")
          }
          
        });
    }
    

    //tab.value = 1;

    //console.log(tab.value);
  }


  public BookAppointment() {
    var system = this.general.getObject("SystemValue");
    system.LoginValue = '1';
    this.general.setObject('SystemValue',system);
    this.viewData = system.LoginValue;
    
    this.navCtrl.push(NewappointmentPage);
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
            console.log('Buy clicked');
            this.CancelAppointment();
          }
        }
      ]
    });
    alert.present();
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
        this.loading.dismiss();
        console.error("Server Error"+error);
      }
      );

  }

}
