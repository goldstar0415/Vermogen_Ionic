import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Http, URLSearchParams, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GeneralProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeneralProvider {

	//System: Object = {};



 	System = {
     "LoginValue": "0",
     "userId":"0",
     "mobileNumber" : "0",
     "vehicleNumber" : "0",
     "selectedCentreId" : ""
	 };

	constructor(public http: Http) {
		console.log(this.System);
		//this.System.LoginValue = 0;
		console.log('Hello GeneralProvider Provider');
	}


	public setObject(Key, Value) {
		window.localStorage[Key] = JSON.stringify(Value);  //Value.json();
	}
	public getObject(key) {
		return JSON.parse(window.localStorage[key] || '[]');
	}



	public loginCheck(credentials) {
		//let headers = new Headers();
		//let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
		var credentials = credentials;
		var mobileNumberValue = "";
		var mobileNumberSplit = [];
		//headers.append('Content-Type', 'application/x-www-form-urlencoded');

		/*let options = {
		    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
		};*/


		/*var obj = { Mobile : '' , VehicleNo : ''};
		obj.VehicleNo = credentials.vehicleNumber;
		obj.Mobile = credentials.mobileNumber;*/

		mobileNumberValue = credentials.mobileNumber;
		mobileNumberSplit = mobileNumberValue.split('+');

		let body = new URLSearchParams();
		body.set('VehicleNo', credentials.vehicleNumber);
		body.set('Mobile', mobileNumberSplit[1]);

		//var jsonObject = JSON.stringify(obj);

		var mainApi = 'http://www.meridians2.com:8082/api/Login';
		var mainApiDev = 'http://www.meridians2.com:8888/api/Login';
		var mainApiProd = 'https://www.vermogentech.com:88/api/Login';
		
		//let body = `VehicleNo=${credentials.vehicleNumber}&Mobile=${credentials.mobileNumber}`;

		return Observable.create(observer => {
			this.http.post(mainApiProd, body)
			.subscribe(res => {
				console.log("res"+res.json());
				var checkValue = JSON.parse(res.json())

				if (checkValue.Success == true) {
					if (checkValue.HasUpcomingAppointments >= 1) {
					 	this.System.LoginValue = '2';
					 }
					 else {
					 	this.System.LoginValue = '1';
					 }
					
					this.System.userId = checkValue.UserId;
					this.System.vehicleNumber = credentials.vehicleNumber;
					this.System.mobileNumber = mobileNumberSplit[1];
					this.setObject('SystemValue',this.System);
					console.log(this.getObject("SystemValue"));
					let access = true;
					observer.next(access);
					observer.complete();
				} else {
					this.System.LoginValue = '0';
					this.setObject('SystemValue',this.System);
					console.log(this.getObject("SystemValue"));
					let access = true;
					observer.next(access);
					observer.complete();
				}
				

			});
	
		})
		
	}



	public callApi(api, value){
		var mainApi = 'http://www.meridians2.com:8082/api/'+api;
		var mainApiDev = 'http://www.meridians2.com:8888/api/'+api;
		var mainApiProd = 'https://www.vermogentech.com:88/api/'+api;
        return this.http.get(mainApiProd , value ).map((res: Response) => res.json());
    }

    public callPostApi(api, value) {
    	var mainApi = 'http://www.meridians2.com:8082/api/'+api;
    	var mainApiDev = 'http://www.meridians2.com:8888/api/'+api;
    	var mainApiProd = 'https://www.vermogentech.com:88/api/'+api;
    	return this.http.post(mainApiProd , value ).map((res: Response) => res.json());
    	// return this.http.post('http://www.meridians2.com:8888/api/' +api, value )
    	// .map(res => res.json());

  //   	return Observable.create(observer => {
		// 	this.http.post("http://www.meridians2.com:8888/api/"+api, value)
		// 	.subscribe(res => {
		// 		console.log("res"+res.json());
		// 		var checkValue = JSON.parse(res.json())
		// 		observer.next(res.json());
		// 		observer.complete();

				

		// 	});
	
		// })

    }

    public callPostApiWithHeader(api, value, options) {
    	var mainApi = 'http://www.meridians2.com:8082/api/'+api;
    	var mainApiDev = 'http://www.meridians2.com:8888/api/'+api;
    	var mainApiProd = 'https://www.vermogentech.com:88/api/'+api;
    	return this.http.post(mainApiProd , value , options).map((res: Response) => res.json());
    }

}
