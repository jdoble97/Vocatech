import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {ConfigurationRouteService} from './configurationRoute'
@Injectable({
  providedIn: 'root'
})
export class CartasService {

  constructor(private http: HttpClient) { }

  getCartas(idBaraja: number, token: string){
    let miUrl = `${ConfigurationRouteService.url}/barajas/${idBaraja}`;
    return this.http.get(miUrl, {headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }});
  }
}
