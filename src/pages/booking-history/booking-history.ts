import { Component , OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditAppointmentPage } from '../edit-appointment/edit-appointment';
import { GeneralProvider } from '../../providers/general/general';
import { LoadingController , AlertController, Loading} from 'ionic-angular';
/**
 * Generated class for the BookingHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking-history',
  templateUrl: 'booking-history.html',
})
export class BookingHistoryPage implements OnInit {



  loading : Loading;
  getbookingHistoryData = [];
  userId = "";
  mobileNumber = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public general : GeneralProvider, private loadingCtrl: LoadingController,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingHistoryPage');
  }


  ngOnInit() {
    this.presentLoadingText();
    var system = this.general.getObject("SystemValue");
    var count = Object.keys(system).length;
    if (count!= 0 && system.LoginValue != 0) {
      this.userId = system.userId;
      this.mobileNumber = system.mobileNumber;
      this.getBookingHistory();
    }
    else {
      this.userId = "";
      this.mobileNumber = "";
      this.showError("Please login first to see bookings history");
      //this.getbookingHistoryData = [];
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


  public getBookingHistory() {
    

    let api = 'AppointmentHistory/'+this.userId+','+this.mobileNumber+'';
    //let parsedValue = {};

    this.general.callApi(api, "").subscribe(
      data => {

        console.log(JSON.parse(data));
        var parsedValue = JSON.parse(data);
        
        if (parsedValue.Success == true) { 
          this.getbookingHistoryData = JSON.parse(data);
          this.loading.dismiss();
          console.log("serviceCentreList" +this.getbookingHistoryData);
          return true;
        } else {
          this.loading.dismiss();
          
          //this.navCtrl.push(TabsPage, {tabIndex: 0});
          this.showError("No Bookings History");
          return true;
        }
        
      },
      error => {
        this.loading.dismiss();
        console.error("No Bookings History");
      }
     );
  }

 

  public editAppointment(bookingHistoryDetailsValue) {
  	this.navCtrl.push(EditAppointmentPage, { selectedValue : bookingHistoryDetailsValue});
  }

}
