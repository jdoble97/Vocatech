import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BarajaService {

  constructor(private http: HttpClient) { }

  getBrajas(token: string, urlApi: string){
    let misheaders = new HttpHeaders({'Content-Type': 'application/json', Authorization: `Bearer ${token}`});
    return this.http.get(urlApi,{headers: misheaders});
  }
}
