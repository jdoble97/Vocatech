import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Baraja } from '../shared/models/baraja';
import { ConfigurationRouteService } from './configurationRoute';

@Injectable({
  providedIn: 'root'
})
export class BarajaService {


  constructor(private http: HttpClient) {
    
  }

  //Create
  insertBaraja(endpoint: string, baraja: Baraja, token: string) {
    return this.http.post(ConfigurationRouteService.url + '/baraja', JSON.stringify(baraja), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  }

  //Read
  selectBarajas(endpoint: string, token: string) {
    let misheaders = new HttpHeaders({Authorization: `Bearer ${token}` });
    return this.http.get(endpoint, { headers: misheaders });
  }

  //Update
  updateBaraja(endpoint: string, baraja: Baraja, token: string) {
    return this.http.put(endpoint, baraja, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  }

  //Delete
  deleteBaraja(endpoint: string, token: string) {
    return this.http.delete(endpoint, {headers:{
      Authorization: `Bearer ${token}`
    }})
  }

  ////////
  listDecks(endpoint: string, token: string) {
    return this.http.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  //
  getNumberDecks(token: string) {
    return this.http.get(ConfigurationRouteService.url + '/number-decks', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
