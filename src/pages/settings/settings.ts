import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GeneralProvider } from '../../providers/general/general';
import { LoadingController , AlertController, Loading, App} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Device } from '@ionic-native/device';
import { URLSearchParams } from '@angular/http';
import { AppVersion } from '@ionic-native/app-version';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit{

  loading : Loading;
  userId = "";
  mobileNumber = "";
  LoginValue = "";
    platformId :any;
    appVer: any ;
    viewData : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public general : GeneralProvider, private loadingCtrl: LoadingController,private app:App, platform : Platform, private device: Device,private alertCtrl: AlertController, private appVersion: AppVersion) {
    // platform.ready().then(() =>{
    //   console.log(this.device.platform);
      
    //   if (this.device.platform =='Android') {
    //       this.platformId = 2;
    //       console.log("running on Android device!");
    //   }
    //   if (this.device.platform == 'iOS') {
    //       this.platformId = 1;
    //       //this.appVersion.getVersionNumber();
    //       console.log(this.appVersion.getVersionNumber());
    //   }
    // })
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad SettingsPage');
  }

  ionViewWillEnter() {
    console.log(this.device.platform);
      
      if (this.device.platform =='Android') {
          this.platformId = 2;
          console.log("running on Android device!");
          this.appVersion.getVersionNumber().then((s) => {
            this.appVer = s;
            console.log(s);
            console.log(this.appVer);
          })
      }
      if (this.device.platform == 'iOS') {
          this.platformId = 1;
          this.appVersion.getVersionNumber().then((s) => {
            this.appVer = s;
            console.log(s);
            console.log(this.appVer);
          })
          //console.log(this.appVer);
      }
    var system = this.general.getObject("SystemValue");
    var count = Object.keys(system).length;
    if (count == 0 || system.LoginValue == 0) {
      system.LoginValue = '0';
      this.general.setObject('SystemValue',system);
      this.viewData = system.LoginValue;
    }
    this.viewData = system.LoginValue;
  }

  ngOnInit() {

  }

  SignOut() {
    
    var system = this.general.getObject("SystemValue");
    system.LoginValue = '0';
    system.userId = '';
    system.mobileNumber = '';
    this.general.setObject('SystemValue', system);
    this.app.getRootNav().setRoot( TabsPage,{index:0} );

  }

  public presentLoadingText() {

    this.loading = this.loadingCtrl.create({
     
      content: 'Please Wait...'
    });

    this.loading.present();

    
   //loading.dismiss();
  }

  public presentConfirm(titleValue) {
    
    //event.stopPropagation();
    let alert = this.alertCtrl.create({
      title: titleValue,
      cssClass: 'alert-wrapper-vermogen',
      buttons: [
        {
          text: 'Later',
          cssClass: 'alert-wrapper-vermogen-button',
          role: 'cancel',
          handler: () => {
          console.log('Cancel clicked');
          }
        },
        {
          text: 'Download',
          cssClass: 'alert-wrapper-vermogen-cancelButton',
          handler: () => {
          //this.CancelAppointment();
          //window.location.href = "https://itunes.apple.com/in/app/shenton-pims/id1021220227?mt=8";
          if(this.platformId == 1)
          {

          window.location.href = "https://itunes.apple.com/us/app/vermogen-auto/id1329895448?ls=1&mt=8";

          }else{
          window.location.href = "https://play.google.com/store/apps/details?id=sg.com.meridiansolutions.vermogen";

          }

          console.log('Download clicked');
          }
        }
        ]
    });
    alert.present();
  }

  checkUpdate() {

    this.presentLoadingText();
    let api = 'AppVersionCheck';
    
    let body = new URLSearchParams();
    body.set('appVersion', this.appVer);
    body.set('platformId', this.platformId);

    this.general.callPostApi(api, body).subscribe(
      data => {
        console.log(JSON.parse(data));
        var parsedValue = JSON.parse(data);

        this.loading.dismiss();
        if (parsedValue.Success) { 
          if (parsedValue.AppVersionCheck.isforce) { 
            var title = 'Do you want to download the latest version of Vermogen auto?';
              this.presentConfirm(title);
          } else {
            var title1 = 'download the latest version of Vermogen auto';
            this.presentConfirm(title1);
          }
          
        } else {
          // code...
        }

    })
    

  }

}
