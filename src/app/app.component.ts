import { Component, ViewChild } from '@angular/core';
import { Platform , Nav, NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
// import { PushbotsPlugin } from 'pushbots-cordova-plugin';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { TabsPage } from '../pages/tabs/tabs';
import { FCM, NotificationData } from "@ionic-native/fcm";
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

//var PushbotsPlugin = require("pushbots-cordova-plugin");
//declare var PushbotsPlugin

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav:Nav;
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, keyboard : Keyboard,fcm:FCM,public alertCtrl:AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      keyboard.hideKeyboardAccessoryBar(false);
      //PushbotsPlugin.initialize("5a321f3a9b823a18338b4569", {"android":{"sender_id":""}});

            fcm.onNotification()
        .subscribe(notification => {
          //alert(JSON.stringify(notification));
        if(notification.wasTapped) {
          //alert("Received in background");
          
        
          } else {
            //alert("Received in foreground");
            let alert = this.alertCtrl.create({
              title: notification.title,
              subTitle: notification.body,
              buttons: ['Dismiss']
            });
            alert.present();
          };
        
          //alert(console.log(JSON.stringify(notification)))
            console.log(JSON.stringify(notification));

      });
       

    });
  }
}
