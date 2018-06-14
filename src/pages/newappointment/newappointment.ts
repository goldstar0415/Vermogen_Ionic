import { Component , OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CalendarviewPage } from '../calendarview/calendarview';
import { GeneralProvider } from '../../providers/general/general';
import { AlertController} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

/**
 * Generated class for the NewappointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-newappointment',
  templateUrl: 'newappointment.html',
})
export class NewappointmentPage implements OnInit{

  getData = [];
  serviceId : any;
  userId = "";
  mobileNumber = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public general : GeneralProvider,private alertCtrl: AlertController) {
    this.serviceId = 0;
  }

  ionViewDidLoad() {
	
    console.log('ionViewDidLoad NewappointmentPage');
  }

  checkCalendar(serviceCentreId, centreName, centreAddress) {
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
    system.selectedCentreId = serviceCentreId;
    this.general.setObject('SystemValue',system);

    this.navCtrl.push(CalendarviewPage, {
        serviceCentreName: centreName, serviceCentreAddress: centreAddress, selectedServiceCentreId : serviceCentreId
    });

  	//this.navCtrl.push(CalendarviewPage);
  }

  ngOnInit() {

    this.getServiceCentres();
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

        var parsedValue = JSON.parse(data);
        
        if (parsedValue.Success == true) { 
          this.getData = parsedValue;
          console.log("serviceCentreList" +this.getData);
          return true;
        } else {
            this.showError("No Service Centre");
        }
        
       },
       error => {
         console.error("Error saving food!");
         return Observable.throw(error);
       }
    );
  }

}
