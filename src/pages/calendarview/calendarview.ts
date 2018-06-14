import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppointmentSummaryPage } from '../appointment-summary/appointment-summary';
import { NewappointmentPage } from '../newappointment/newappointment';
import { GeneralProvider } from '../../providers/general/general';
import { DatePipe } from '@angular/common'
import { LoadingController , AlertController, Loading} from 'ionic-angular';


/**
 * Generated class for the CalendarviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendarview',
  templateUrl: 'calendarview.html'
})
export class CalendarviewPage implements OnInit {
	public input10Moment: any;
  public dateTime: any;
  public timeValue : any;
  date : any;
  serviceCentreSelectedId : any;
  tabBarElement : any;
  userId = "";
  mobileNumber = "";
  selectedServiceCentreId = "";
  selectedCentreName = "";
  selectedCentreAddress = "";
  selectedCentreId = "";

  loading : Loading;
  getTimeSlotData : {};
  checkButton :boolean;
  checkButton1 : boolean;
  checkButton2 : boolean;
  checkButton3 : boolean;
  checkButton4 : boolean;
  checkButton5 : boolean;
  checkButton6 : boolean;
  checkButton7 : boolean;

  slotsLeft :number;
  slotsLeft1 : number;
  slotsLeft2 : number;
  slotsLeft3 : number;
  slotsLeft4 : number;
  slotsLeft5 : number;
  slotsLeft6 : number;
  slotsLeft7 : number;
  
   timeSelectedSLots = "";
   fullTimeSLots = "";
   displayValueSlots = "";

  getTotalTimeSlots : number;


  constructor(public navCtrl: NavController, public navParams: NavParams, public datepipe: DatePipe, public general : GeneralProvider, private loadingCtrl: LoadingController , private alertCtrl: AlertController) {
    this.serviceCentreSelectedId = 0;
    
    // this.datePicker = new DatePicker(<any>this.modalCtrl, <any>this.viewController);
    // this.datePicker.onDateSelected.subscribe((date) => { console.log(date); });
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

  }

  ngOnInit() {

    
  }

  public presentLoadingText() {
    this.loading = this.loadingCtrl.create({
     
      content: 'Please Wait...'
    });

    this.loading.present();

   
   //loading.dismiss();
  }

  ionViewWillEnter(){
    this.tabBarElement.style.display = 'none';
    this.date=new Date();
    this.dateTime =this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.timeValue = this.datepipe.transform(this.date, 'h:mm:ss');
    console.log(this.dateTime);
    
    this.selectedCentreName = this.navParams.get('serviceCentreName'); 
    this.selectedCentreAddress = this.navParams.get('serviceCentreAddress');
    this.selectedCentreId = this.navParams.get('selectedServiceCentreId');

    this.getAppointmentTimeSlots();
    
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarviewPage');
  }

  public showError(text) {

    let alert = this.alertCtrl.create({
    title : '',
    subTitle : text,
    buttons : ['OK']
    });
    alert.present(prompt);
    
    }

  public getAppointmentTimeSlots(){
    //this.presentLoadingText();
    var system = this.general.getObject("SystemValue");
    var count = Object.keys(system).length;
    if (count!= 0 || system.LoginValue != 0) {
      this.userId = system.userId;
      this.mobileNumber = system.mobileNumber;
      
    }
    else {
      this.userId = "";
      this.mobileNumber = "";
      
    }

    this.selectedServiceCentreId = this.selectedCentreId;

    var timeSelected = "";
    var fullTime = "";
    if (this.input10Moment == null) { 
      timeSelected = this.dateTime;
      fullTime = this.date;
    } else {
      timeSelected =this.datepipe.transform(this.input10Moment, 'yyyy-MM-dd');
      
      fullTime = this.input10Moment;
    }
    let api = 'TimeSlots/'+timeSelected+','+this.selectedServiceCentreId+' ';
   

    this.general.callApi(api, "").subscribe(
      data => {

        console.log(JSON.parse(data));
        let parsedValue = JSON.parse(data);
        this.getTimeSlotData = JSON.parse(data);

        //this.loading.dismiss();
        if (parsedValue.Success == true) { 
          this.getTotalTimeSlots = parsedValue.AvailableTimeSlots;
          this.checkButton = parsedValue.TimeSlots[10].slotAvailable;
          this.checkButton1 = parsedValue.TimeSlots[11].slotAvailable;
          this.checkButton2 = parsedValue.TimeSlots[12].slotAvailable;
          this.checkButton3 = parsedValue.TimeSlots[13].slotAvailable;
          this.checkButton4 = parsedValue.TimeSlots[14].slotAvailable;
          this.checkButton5 = parsedValue.TimeSlots[15].slotAvailable;
          this.checkButton6 = parsedValue.TimeSlots[16].slotAvailable;
          this.checkButton7 = parsedValue.TimeSlots[17].slotAvailable;

          this.slotsLeft  = parsedValue.TimeSlots[10].availableSlots;
          this.slotsLeft1 = parsedValue.TimeSlots[11].availableSlots;
          this.slotsLeft2 = parsedValue.TimeSlots[12].availableSlots;
          this.slotsLeft3 = parsedValue.TimeSlots[13].availableSlots;
          this.slotsLeft4 = parsedValue.TimeSlots[14].availableSlots;
          this.slotsLeft5 = parsedValue.TimeSlots[15].availableSlots;
          this.slotsLeft6 = parsedValue.TimeSlots[16].availableSlots;
          this.slotsLeft7 = parsedValue.TimeSlots[17].availableSlots;
          console.log("timeslots" +parsedValue.TimeSlots[10].slotAvailable);
          return true;
        } else {
          this.showError("NO Data");
          return true;
        }
        
      },
      error => {
        console.error("Error saving food!");
      }
     );
  }


  public selectTimeSlot(value, displayValue) {
    var timeSelected = "";
    var fullTime = "";
    
    if (this.input10Moment == null) { 
      timeSelected = this.dateTime;
      fullTime = this.date;
      this.fullTimeSLots = fullTime;
      this.timeSelectedSLots = timeSelected;
      this.displayValueSlots = displayValue;
    } else {
      timeSelected = this.input10Moment;
      fullTime = this.input10Moment;
      this.fullTimeSLots = fullTime;
      this.timeSelectedSLots = timeSelected;
      this.displayValueSlots = displayValue;
    }
    this.dateTime =this.datepipe.transform(timeSelected, 'yyyy-MM-dd');
    this.timeValue = value;
    console.log(this.timeValue);
    var system = this.general.getObject("SystemValue");
    var count = Object.keys(system).length;
    if (count == 0 || system.LoginValue == 0) {

      this.showError("Please login first to book an appointment");
      
    }
    else if(system.LoginValue == 2) {
      this.getUpcomingAppointment();
      //this.showError("You already have prior booking, you may cancel and book again");
    }
    else {
      this.navCtrl.push(AppointmentSummaryPage, {
        date: this.dateTime, time: this.timeValue, fTime : fullTime , serCentreName : this.selectedCentreName, serCentreAddress :this.selectedCentreAddress, disTimeValue : displayValue
    });
    }


    
   
  }

  public getUpcomingAppointment(){
    //this.presentLoadingText();
    var system = this.general.getObject("SystemValue");
    let api = 'UpcomingAppointment/'+system.userId+','+system.mobileNumber+' ';
    //let parsedValue = {};

    this.general.callApi(api, "").subscribe(
      data => {
        console.log(JSON.parse(data));
        var parsedValue = JSON.parse(data);
        //this.getUpcomingData = parsedValue.UpcomingAppointment[0];
        //this.loading.dismiss();
        if (parsedValue.Success == true) {
          system.LoginValue = '2';
          this.showError("You already have prior booking, you may cancel and book again");
          return true;
        } else {
          system.LoginValue = '1';
            this.navCtrl.push(AppointmentSummaryPage, {
              date: this.dateTime, time: this.timeValue, fTime : this.fullTimeSLots , serCentreName : this.selectedCentreName, serCentreAddress :this.selectedCentreAddress, disTimeValue : this.displayValueSlots
          });
          //console.error("Error upcoming food!");
        }

      },
      error => {
        console.error("Error saving food!");
      }
    );
  }
  

  // public selectDate(event: Event) {
    
  //   console.log(this.input10Moment);
  //   this.dateTime = this.datepipe.transform(this.input10Moment, 'yyyy-MM-dd');
  //   console.log(this.dateTime);
  // }
}
