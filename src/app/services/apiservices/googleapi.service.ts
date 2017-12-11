import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import 'rxjs/add/operator/toPromise';

@Injectable()

export class GoogleapiService {
	private api = 'https://screenet.com.au/server/index.php';
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor( private http: HttpClient ){}

	placeapi( longitude: any, latitude: any, radius: number, type: string ): Promise<any>{
		return this.http
			.post( this.api, JSON.stringify({longitude: longitude, latitude: latitude, radius: radius, type:type}) )
			.toPromise()
			.then(res => res);
	}

}
