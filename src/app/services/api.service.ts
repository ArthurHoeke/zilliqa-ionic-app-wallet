import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  //Empty for now, might be required
  //later on for interaction with rest API staking

  constructor(private http: HTTP) {
  }
}
