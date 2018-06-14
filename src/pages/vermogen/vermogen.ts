import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GmapsPage } from '../gmaps/gmaps';
import { CalendarviewPage } from '../calendarview/calendarview';
import { GeneralProvider } from '../../providers/general/general';
import { LoadingController , AlertController, Loading} from 'ionic-angular';
/**
 * Generated class for the VermogenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vermogen',
  templateUrl: 'vermogen.html',
})
export class VermogenPage implements OnInit {
	tabName: string = "about";
  getData = [];
  aboutUsData = [];
  serviceId : any;
  userId = "";
  mobileNumber = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public general : GeneralProvider, private alertCtrl: AlertController) {
  	this.tabName = "about";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VermogenPage');
  }

  ionViewWillEnter(){
    this.tabName = "about";
    this.getAboutUsData();
    this.getServiceCentres();
  }

  openLocation(latitude, longitude, serviceResourceName) {
    this.navCtrl.push(GmapsPage, {serviceCentreLatitude : latitude, serviceCntreLongitude:longitude, serviceCentreName : serviceResourceName});
  }

  ngOnInit() {
    this.tabName = "about";
    
  }

  public showError(text) {

    let alert = this.alertCtrl.create({
    title : '',
    subTitle : text,
    buttons : ['OK']
    });
    alert.present(prompt);
    
    }

  public getServiceCentres() {
    let api = 'ServiceCentres/';

    this.general.callApi(api, "").subscribe(
       data => {

        console.log(JSON.parse(data));
        let parsedValue = JSON.parse(data);
        if (parsedValue.Success == true) { 
          this.getData = parsedValue;
          console.log("serviceCentreList" +this.getData);
          return true;
         } else {
           //this.showError()
           return false;
         }
        
       },
       error => {
         console.error("Error saving food!");
         //return Observable.throw(error);
       }
    );
  }


  public BookAppointment(serviceCentreId, centreName, centreAddress) {
    var system = this.general.getObject("SystemValue");
    var count = Object.keys(system).length;
    if (count!= 0) {
      this.userId = system.userId;
      this.mobileNumber = system.mobileNumber;
    }
    else {
      this.userId = "";
      this.mobileNumber = "";
    }
    this.serviceId = serviceCentreId;
    system.selectedCentreId = this.serviceId;
    this.general.setObject('SystemValue',system);

    var systemUpdate = this.general.getObject("SystemValue");

    this.navCtrl.push(CalendarviewPage, {
        serviceCentreName: centreName, serviceCentreAddress: centreAddress, selectedServiceCentreId : serviceCentreId
    });

    //this.navCtrl.push(CalendarviewPage);
  }

  public getAboutUsData(){
    let api = 'AboutUs';

    this.general.callApi(api, "").subscribe(
       data => {

        console.log(JSON.parse(data));
        let parsedValue = JSON.parse(data);
        if (parsedValue.Success == true) { 
          this.aboutUsData = parsedValue.AboutUs;
          console.log("About Us Data" +this.aboutUsData);
          return true;
         } else {
           //this.showError()
           return false;
         }
        
       },
       error => {
         console.error("Error saving food!");
         //return Observable.throw(error);
       }
    );
  }

}
