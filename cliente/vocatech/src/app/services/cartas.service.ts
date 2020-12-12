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
  insertCarta(idBaraja: number, carta: Carta, token: string){
    return this.http.post(ConfigurationRouteService.url+'/carta',JSON.stringify({id_baraja: idBaraja, ...carta}),{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  }

  //Read
  getCartas(idBaraja: number, token: string){
    let miUrl = `${ConfigurationRouteService.url}/cartas/${idBaraja}`;
    return this.http.get(miUrl, {headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }});
  }
  
  //Update
  updateCarta( carta: Carta, token: string){
    return this.http.put(ConfigurationRouteService.url+'/carta',JSON.stringify(carta),{headers:{
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }});
  }

  //Delete
  deleteCarta(idCarta: number, token: string){
    return this.http.delete(ConfigurationRouteService.url+`/carta/${idCarta}`,{headers:{
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }})
  }
}