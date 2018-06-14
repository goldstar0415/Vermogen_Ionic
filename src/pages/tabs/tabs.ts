import { Component , ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams , Nav} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SettingsPage } from '../settings/settings';
import { VermogenPage } from '../vermogen/vermogen';
import { BookingPage } from '../booking/booking';
import { InsurancePage } from '../insurance/insurance';

@Component({
	selector: 'tabs-page',
  templateUrl: 'tabs.html'
})
export class TabsPage {
	@ViewChild(Nav) nav:Nav;

	 //@ViewChild('myTabs') tabRef: Tabs;
	
	// mySelectedIndex : any;
	// mySelectedIndex1 : any;
	// mySelectedIndex2 : any;
	// mySelectedIndex3 : any;

	// this.mySelectedIndex = navParams.data.tabIndex || 0;
	// this.mySelectedIndex1 = navParams.data.tabIndex || 0;
	// this.mySelectedIndex2 = navParams.data.tabIndex || 0;
	// this.mySelectedIndex3 = navParams.data.tabIndex || 0;

	// value : number = 0;

	tab1Root = LoginPage;
	tab2Root = BookingPage;
	tab3Root = VermogenPage;
	tab4Root = SettingsPage;
	tab5Root = InsurancePage;
	mySelectedIndex: number;

  constructor(public navParams :NavParams) {
  	//this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

  ionViewDidEnter() {

  	//let value = this.navParams.data.index || 0;
  	

  	//this.tabRef.select(value);
    // Now you can use the tabs reference
    //console.log("a = ", this.tabRef);
    //this.selectedIndexChange(0);
 }

  public selectedIndexChange(val) {
  	//this.tab1Root = LoginPage;
  	//this.tabRef.select(0);
  }
}
