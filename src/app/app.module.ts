import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { VermogenPage } from '../pages/vermogen/vermogen';

import { BookingPage } from '../pages/booking/booking';
import { UpcomingBookingDetailPage } from '../pages/upcoming-booking-detail/upcoming-booking-detail';
import { BookingHistoryPage } from '../pages/booking-history/booking-history';

import { NewappointmentPage } from '../pages/newappointment/newappointment';
import { CalendarviewPage } from '../pages/calendarview/calendarview';
import { AppointmentSummaryPage } from '../pages/appointment-summary/appointment-summary';
import { EditAppointmentPage } from '../pages/edit-appointment/edit-appointment';

import { GmapsPage } from '../pages/gmaps/gmaps';
import { Geolocation } from '@ionic-native/geolocation';

import { InternationalPhoneModule } from 'ng4-intl-phone';

import { CalendarModule } from 'ionic3-calendar';
import { DatePicker } from 'ionic2-date-picker';
import { DatePickerModule } from 'datepicker-ionic2';

import { DateTimePickerModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { DatePipe } from '@angular/common';

import { InsurancePage } from '../pages/insurance/insurance';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import {Camera} from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { GeneralProvider } from '../providers/general/general';

import { AgmCoreModule } from '@agm/core';

import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';

import { FCM } from '@ionic-native/fcm';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SettingsPage,
    VermogenPage,
    BookingPage,
    NewappointmentPage,
    CalendarviewPage,
    DatePicker,
    AppointmentSummaryPage,
    BookingHistoryPage,
    EditAppointmentPage,
    UpcomingBookingDetailPage,
    GmapsPage,
    InsurancePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CalendarModule,
    DatePickerModule,
    DateTimePickerModule,
    BrowserAnimationsModule,
    InternationalPhoneModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAVTa3f7qtDEjW4hiqgNXNKt7T3JaN6qP4'
    })

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SettingsPage,
    VermogenPage,
    BookingPage,
    NewappointmentPage,
    CalendarviewPage,
    DatePicker,
    AppointmentSummaryPage,
    BookingHistoryPage,
    EditAppointmentPage,
    UpcomingBookingDetailPage,
    GmapsPage,
    InsurancePage
  ],
  providers: [
    Device,
    AppVersion,
    StatusBar,
    SplashScreen,
    DatePipe,
    Geolocation,
    File,
    Transfer,
    FilePath,
    Camera,
    ImagePicker,
    Crop,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeneralProvider,
    FCM
  ]
})
export class AppModule {}
