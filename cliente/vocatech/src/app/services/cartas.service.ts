import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {ConfigurationRouteService} from './configurationRoute'
import { Carta } from '../shared/models/carta';
@Injectable({
  providedIn: 'root'
})
export class CartasService {

  constructor(private http: HttpClient) { }


  //Create
  insertCarta(endpoint: string, carta: Carta, token: string){
    return this.http.post(ConfigurationRouteService.url+'/carta',JSON.stringify(carta),{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  }

  //Read
  getCartas(endpoint: string, token: string){
    return this.http.get(endpoint, {headers: {
      Authorization: `Bearer ${token}`
    }});
  }
  
  //Update
  updateCarta( endpoint: string,carta: Carta, token: string){
    return this.http.put(endpoint,JSON.stringify(carta),{headers:{
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }});
  }

  //Delete
  deleteCarta(endpoint: string, token: string){
    return this.http.delete(endpoint,{headers:{
      Authorization: `Bearer ${token}`
    }})
  }
}