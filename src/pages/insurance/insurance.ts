import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController , ActionSheetController, ToastController, Platform, LoadingController, Loading} from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { GeneralProvider } from '../../providers/general/general';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import {HttpParams, HttpHeaders} from '@angular/common/http';

import 'fabric';

declare let fabric: any;


/**
 * Generated class for the InsurancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-insurance',
  templateUrl: 'insurance.html',
})
export class InsurancePage {

	private canvas;

	photos = [];
	base64Image : string;
	lastImage: string = null;
	loading : Loading;

	newPhotos = [];

	registerCredentials = { insurerName : '', contactNumber: '',email : '', company: '',claims : '', yearOfManf: '', makeModel : ''};


	constructor(public navCtrl: NavController, public navParams: NavParams, private camera : Camera, private alertCtrl : AlertController, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, public general : GeneralProvider, public imagePicker: ImagePicker,public cropService: Crop) {
		this.registerCredentials.claims = 'default';
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad InsurancePage');
	}

	

	public ConfirmationPrompt(text, titleValue) {
	  let alert = this.alertCtrl.create({
	  title : titleValue,
	  subTitle : text,
	  buttons : [{
	      text: 'OK',
	      handler: () => {
	        console.log('Ok clicked');
	        //this.app.getRootNav().setRoot( TabsPage,{index:0} );
	        // this.navCtrl.push(BookingPage);
	      }
	    }]
	  });
	  alert.present(prompt);
	
	}


	public presentActionSheet() {
		if (this.photos.length>5) { 
			this.ConfirmationPrompt("Maximum of four images can be uploaded", "ALert!!!");
		} else {
			let actionSheet = this.actionSheetCtrl.create({
			title: 'Select Image Source',
			buttons: [
			{
			  text: 'Load from Library',
			  handler: () => {
			  	//this.openImagePicker();
			    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
			  }
			},
			{
			  text: 'Use Camera',
			  handler: () => {
			  	//this.takePicture();
			    this.takePicture(this.camera.PictureSourceType.CAMERA);
			  }
			},
			{
			  text: 'Cancel',
			  role: 'cancel'
			}
			]
			});
			actionSheet.present();
		}
	    
	  }



	public takePicture(sourceType) {
		var options = {
		    quality: 10,
		    sourceType: sourceType,
		    saveToPhotoAlbum: false,
		    correctOrientation: true,
		    destinationType: this.camera.DestinationType.DATA_URL,
	      	encodingType: this.camera.EncodingType.JPEG,
	      	mediaType: this.camera.MediaType.PICTURE,
	      	allowEdit: true,
		  };

		this.camera.getPicture(options).then((imagePath) => {
		    // Special handling for Android library
		    this.base64Image = "data:image/jpeg;base64," + imagePath;
		    this.photos.push(this.base64Image);
		    this.photos.reverse();
		    this.drawing(this.base64Image);
		    console.log(this.photos);
		  //   if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
		  //     this.filePath.resolveNativePath(imagePath)
		  //       .then(filePath => {
		  //         let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
		  //         let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
		  //         this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
		  //       });
		  //   } else {
		  //     var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
		  //     var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
		  //     this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
		  //   }
		  // }, (err) => {
		  //   this.presentToast('Error while selecting image.');
		  });
		    // this.camera.getPicture(options) .then((imageData) => {
		    //     this.base64Image = "data:image/jpeg;base64," + imageData;
		    //     this.photos.push(this.base64Image);
		    //     this.photos.reverse();
		    //   }, (err) => {
		    //     console.log(err);
		    //   });
	}

	public drawing(base64img) {

		let img = new Image();
		
		var width = window.innerWidth; // width of canvas
		var height =width * (4 / 3);

		this.canvas = new fabric.Canvas('c');

		//this.canvas.selection = false;
		//fabric.Object.prototype.selectable = false; // prevent drawing objects to be draggable or clickable

		// sets canvas height and width
		//this.canvas.setHeight(height);
		//this.canvas.setWidth(width);
		// sets canvas height and width
		// *** having both canvas.setHeight and canvas.width prevents errors when saving
		this.canvas.width = width;
		this.canvas.height = height;

		//this.canvas.isDrawingMode = false;

		// this.canvas.setBackgroundImage(base64img, this.canvas.renderAll.bind(this.canvas), {
		//     height: height,
		//     width: width
		// });
		var ctx = this.canvas.getContext('2d');
		ctx.drawImage(img, 0, 0);
		var drawing = this.canvas.toDataURL('image/jpeg');
		this.newPhotos.push(drawing);
		console.log(drawing);
	}

	// private createFileName() {
	//   var d = new Date(),
	//   n = d.getTime(),
	//   newFileName =  n + ".jpg";
	//   return newFileName;
	// }
	 
	// Copy the image to a local folder
	// private copyFileToLocalDir(namePath, currentName, newFileName) {
	//   this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
	//     this.lastImage = newFileName;
	//   }, error => {
	//     this.presentToast('Error while storing file.');
	//   });
	// }
	 
	// private presentToast(text) {
	//   let toast = this.toastCtrl.create({
	//     message: text,
	//     duration: 3000,
	//     position: 'top'
	//   });
	//   toast.present();
	// }
	 
	// // Always get the accurate path to your apps folder
	// public pathForImage(img) {
	//   if (img === null) {
	//     return '';
	//   } else {
	//     return cordova.file.dataDirectory + img;
	//   }
	// }


	public openImagePicker(){
	    let options = {
	      maximumImagesCount: 5,
	    }
	    this.newPhotos = new Array<string>();
	    this.imagePicker.getPictures(options)
	    .then((results) => {
	      this.reduceImages(results).then(() => {
	        console.log('all images cropped!!');
	      });
	    }, (err) => { console.log(err) });
	  }

	  reduceImages(selected_pictures: any) : any{
	    return selected_pictures.reduce((promise:any, item:any) => {
	      return promise.then((result) => {
	        return this.cropService.crop(item, {quality: 75}).then(cropped_image => this.newPhotos.push(cropped_image));
	      });
	    }, Promise.resolve());
	  }

	/*public takePicture(){
	    let options = {
	      quality: 75,
	      correctOrientation: true,
	      destinationType: this.camera.DestinationType.FILE_URI,
	      encodingType: this.camera.EncodingType.JPEG,
	      targetWidth: window.innerWidth ,
          targetHeight: window.innerWidth * (4 / 3),
	    };

	    this.camera.getPicture(options)
	    .then((data) => {
	      this.newPhotos = new Array<string>();
	      this.cropService
	      .crop(data, {quality: 75})
	      .then((filePath: string) => {
	        this.newPhotos.push(filePath);
	        //this.base64Image = "data:image/jpeg;base64," + filePath;
	        	this.photos.push(this.base64Image);
	        	this.photos.reverse();
	        var relativeUri = '/' + filePath.replace(cordova.file.applicationStorageDirectory, '');
	        //this.getFileEntry(filePath);

	        this.convertToBase64(relativeUri, 'image/jpg').then(
              data => {
                console.log(data.toString());
              }
            );

	        //var relativeUri = filePath.toInternalURL()
	        //var relativeUri = filePath.split("file:///")[1];

	        
	        // this.toDataUrl(newImage, function(base64NewImg) {
	        // 	console.log(base64NewImg)
	        // 	//deferred.resolve(base64NewImg);
	        // 	this.base64Image = "data:image/jpeg;base64," + base64NewImg;
	        // 	this.photos.push(this.base64Image);
	        // 	this.photos.reverse();
	        // });
	      }, error => console.error("Error cropping image", error));
	    }, function(error) {
	      console.log(error);
	    });
	  }*/

	public getFileEntry(imgUri) {
            (<any>window).resolveLocalFileSystemURL(imgUri, function success(fileEntry) {
                console.log("got file: " + fileEntry.fullPath);
                console.log('cdvfile URI: ' + fileEntry.toInternalURL());
                var relativeUri = fileEntry.toInternalURL();
                this.convertToBase64(relativeUri.toString(), 'image/jpg').then(
	              data => {
	                console.log(data.toString());
	                this.base64Image = "data:image/jpeg;base64," + data.toString();
		        	this.photos.push(this.base64Image);
		        	this.photos.reverse();
	              }
	            );
                
            });
        }

	public convertToBase64(url, outputFormat) {
		return new Promise((resolve, reject) => {
		  let img = new Image();
		  img.crossOrigin = 'Anonymous';
		  img.onload = function () {
		    let canvas = <HTMLCanvasElement>document.createElement('CANVAS');
		    var ctx = canvas.getContext('2d');
		    var dataURL;
		    canvas.height = img.height;
		    canvas.width = img.width;
		    ctx.drawImage(img, 0, 0);
		    dataURL = canvas.toDataURL(outputFormat);
		    canvas = null;
		    resolve(dataURL);
		  };
		  img.src = url;
		});
	}

	public toDataUrl(src, callback) {
		var img = new Image();
		img.crossOrigin = 'Anonymous';
		img.onload = function() {
		var canvas : any = document.getElementById("mycanvas");
		var ctx = canvas.getContext("2d");
		var dataURL;
		var width = window.innerWidth; // width of canvas
        var height =width * (4 / 3);
		canvas.height = height; // width of canvas
		canvas.width = width;
		ctx.drawImage(this, 0, 0);
		dataURL = canvas.toDataURL('image/jpeg');
		callback(dataURL);
		};
		img.src = src;
	}

	deletePhoto(index){
	   	let confirm = this.alertCtrl.create({
           title: 'Sure you want to delete this photo? There is NO undo!',
           message: '',
           buttons: [
             {
               text: 'No',
               handler: () => {
                 console.log('Disagree clicked');
               }
             }, {
               text: 'Yes',
               handler: () => {
                 console.log('Agree clicked');
                 this.photos.splice(index, 1);
               }
             }
           ]
         });
	    confirm.present();
	}


	public presentLoadingText() {

		this.loading = this.loadingCtrl.create({
		 
		  content: 'Please Wait...'
		});

		this.loading.present();


		//loading.dismiss();
	}

	public checkSubmitInsurance() {
		if (this.registerCredentials.insurerName== '') {
			this.ConfirmationPrompt("Name field Cannot be empty" , "Alert!!!");
		}
		else if (this.registerCredentials.contactNumber== '') {
			this.ConfirmationPrompt("Contact number field Cannot be empty", "Alert!!!");
		}
		else if (this.registerCredentials.email== '') {
			this.ConfirmationPrompt("Email field Cannot be empty", "Alert!!!");
		}
		else if (this.registerCredentials.claims== '') {
			this.ConfirmationPrompt("Claims field Cannot be empty", "Alert!!!");
		}
		else if (this.registerCredentials.yearOfManf== '') {
			this.ConfirmationPrompt("Year of manufacturing field Cannot be empty", "Alert!!!");
		}
		else if (this.registerCredentials.company== '') {
			this.ConfirmationPrompt("Company field Cannot be empty", "Alert!!!");
		}
		else if (this.photos.length == 0) {
			this.ConfirmationPrompt("Atleast one image needs to be uploaded", "Alert!!!");
		}
		else {
			this.submitInsurance();
		}
	}



	public submitInsurance() {
		this.presentLoadingText();
	    let api = 'InsuranceRequest';

	    // let obj = {
	    // 	'Name' : this.registerCredentials.insurerName,
	    // 	'Contact' : this.registerCredentials.contactNumber,
	    // 	'Email' : this.registerCredentials.email,
	    // 	'PastClaim' : this.registerCredentials.claims,
	    // 	'Year' : this.registerCredentials.yearOfManf,
	    // 	'CurrentInsurance' : this.registerCredentials.company,

	    // };
	    

	    let obj1= new Object();
	    let body = new URLSearchParams();
		    body.set('Name', this.registerCredentials.insurerName);
		    body.set('Contact', this.registerCredentials.contactNumber);
		    body.set('Email', this.registerCredentials.email);
		    body.set('PastClaim', this.registerCredentials.claims);
		    body.set('Year',this.registerCredentials.yearOfManf);
		    body.set('CurrentInsurance',this.registerCredentials.company);
	    //body.set('CarLog1',this.base64Image);
	    for (var i = 0; i < this.photos.length; i++) {
	    	var j = i+1;
	    	//body.set('CarLog'+j, decodeURIComponent(this.photos[i]));

	    	// var CarLog = 'CarLog'+j;

		    // obj = {
		    // 	'Name' : this.registerCredentials.insurerName,
		    // 	'Contact' : this.registerCredentials.contactNumber,
		    // 	'Email' : this.registerCredentials.email,
		    // 	'PastClaim' : this.registerCredentials.claims,
		    // 	'Year' : this.registerCredentials.yearOfManf,
		    // 	'CurrentInsurance' : this.registerCredentials.company,
		    // 	'CarLog1' : this.photos[i]
		    // };

		    obj1 = {'Name' : this.registerCredentials.insurerName,'Contact' : this.registerCredentials.contactNumber,'Email' : this.registerCredentials.email,'PastClaim' : this.registerCredentials.claims , 'Model' : this.registerCredentials.makeModel,'Year' : this.registerCredentials.yearOfManf,'CurrentInsurance' : this.registerCredentials.company,'CarLog1' : this.photos[0] || '','CarLog2' : this.photos[1] || '','CarLog3' : this.photos[2] || '','CarLog4' : this.photos[3] || '',
		    }
	    	
	    	body.set('CarLog'+j, this.photos[i]);
	    }
	    //var body = JSON.stringify(obj);

	   //  {
    //   params: new HttpParams().set('id', '56784'),
    //   headers: new HttpHeaders().set('Authorization', 'some-token')
    // }
    //let headers = new Headers();
		//let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		let options = new RequestOptions({ headers: headers });

		//JSON.stringify(obj1)
	    
	    this.general.callPostApiWithHeader(api, obj1, options).subscribe(
			data => {

				console.log(JSON.parse(data));
				var parsedValue = JSON.parse(data);

				this.loading.dismiss();

				if (parsedValue.Success == true) { 

					this.ConfirmationPrompt("Insurance Submitted", "Sucess!!!");
					this.photos = [];
					this.base64Image = '';
					this.registerCredentials = { insurerName : '', contactNumber: '',email : '', company: '',claims : 'default', yearOfManf: '', makeModel : ''};

				  
				  console.log("Insurance Submitted");
				  return true;
				} 
				else {
					this.ConfirmationPrompt("error", "Alert!!!");
					console.error("Error in Insurance");
				}

			},
			error => {
				this.loading.dismiss();
				console.error("Error in Insurance Submitting");
			}
	    );
	    
	}

}
