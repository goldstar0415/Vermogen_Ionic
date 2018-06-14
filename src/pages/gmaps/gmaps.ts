import { Component ,ViewChild, ElementRef, } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController , Loading} from 'ionic-angular';
// import { AgmCoreModule } from 'angular2-google-maps/core';


/**
 * Generated class for the GmapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-gmaps',
  templateUrl: 'gmaps.html',
  
})
export class GmapsPage {

	@ViewChild('map') mapElement: ElementRef;

  loading : Loading;
  private map: any;
	// lat: number = 1.431578;
	// lng: number = 103.828487;
  
  latValue: number = 1.431578;
  lngValues: number = 103.828487;
  selectedServiceCentreName : any;
  


	constructor(public platform: Platform,public navCtrl: NavController , public navParams: NavParams, private geolocation: Geolocation, private loadingCtrl: LoadingController) {
		platform.ready().then(() => {
			//this.getCuurrentLocation()
		 	console.log("Start Loding MAP....")
		});
	}

  ionViewDidLoad() {
    this.presentLoadingText();

    this.latValue = this.navParams.get('serviceCentreLatitude'); 
    this.lngValues = this.navParams.get('serviceCntreLongitude');
    this.selectedServiceCentreName  = this.navParams.get('serviceCentreName');
    
    console.log('ionViewDidLoad GmapsPage');
    this.loadMap();
  }

  public presentLoadingText() {
    this.loading = this.loadingCtrl.create({
     
      content: 'Please Wait...'
    });

    this.loading.present();

   //loading.dismiss();
  }

  public loadMap() {

    //this.loading.dismiss();
  	/*this.geolocation.getCurrentPosition().then((position) => {
      //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  		let latLng = new google.maps.LatLng(this.latValue, this.lngValues);
      
  		let mapOptions = {
  			center : latLng,
  			zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
  		}
  		this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  		
      this.addMarker(latLng);
      

  	}, (err) => {
      console.log(err);
    });*/
    let latLng = new google.maps.LatLng(this.latValue, this.lngValues);
    
    let mapOptions = {
      center : latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.addMarker(latLng);
    this.loading.dismiss();
  }

  public addMarker(latLng){
     //let latLng = new google.maps.LatLng(this.latValue, this.lngValues);
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
   
    let content = "<h4>"+this.selectedServiceCentreName+"</h4>";         
   
    this.addInfoWindow(marker, content);
 
  }
  public addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
 
}

}
