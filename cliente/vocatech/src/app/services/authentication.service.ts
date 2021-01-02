import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ConfigurationRouteService } from './configurationRoute';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  getTokenFromServer(user, endpoint: string){
    let misHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(endpoint, user,{headers: misHeaders});
  }

  sendCredentials(user) {
    let url = ConfigurationRouteService.url+'/login'
    let misHeaders = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post(url, user, {headers: misHeaders});
  }

}
