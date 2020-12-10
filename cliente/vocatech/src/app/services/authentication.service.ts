import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ConfigurationRouteService } from './configurationRoute';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  getTokenFromServer(user){
    let misHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    const url = ConfigurationRouteService.url+'/signup'
    return this.http.post(url, user,{headers: misHeaders});
  }

  sendCredentials(user) {
    let url = ConfigurationRouteService.url+'/login'
    let misHeaders = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post(url, user, {headers: misHeaders});
  }

}
